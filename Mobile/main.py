import kivy
from kivy.app import App 
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen 
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.scrollview import ScrollView
from kivy.core.window import Window
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from kivy.properties import StringProperty
from kivy.clock import Clock
import firebase_admin
from kivy.uix.image import Image
from firebase_admin import credentials
from firebase_admin import firestore
from kivy.garden.mapview import MapMarkerPopup
from kivy.config import Config
import random
import json

Config.set('graphics', 'resizable', True)
cred = credentials.Certificate(r'C:\Users\ayaan\OneDrive\Documents\Programming\environmenthacka-firebase-adminsdk-pjad8-76f0844a4c.json')
firebase_admin.initialize_app(cred)
db = firestore.client()



Builder.load_file("design.kv")



class RoundedButton(Button):
    
    last_clicked_button = StringProperty('Not clicked yet')

    def which_clicked(self):
        mapview = str(self.last_clicked_button)
        docs = db.collection('objects').where('specificType', '==', mapview).stream()
        for doc in docs:
            user_ref = db.collection('objects').document(str(doc.id))
            user_ref.update({
                'output': True
            })
        mainapp.screen_manager.current = 'map_viewer'
        mainapp.screen_manager.transition.direction = "left"
class RootWidget(ScreenManager):
    pass

class MapViewer(Screen):
    def return_to_main(self):
        docs = db.collection('objects').where('output', '==', True).stream()
        for doc in docs:
            user_ref = db.collection('objects').document(str(doc.id))
            user_ref.update({
                'output':False
            })
        for c in list(self.ids.maps.children):
            if isinstance(c, MapMarkerPopup): 
                self.ids.maps.remove_widget(c)
        self.manager.current = "main_screen"
        self.manager.transition.direction = "right"
    
    def on_enter(self):
        Clock.schedule_once(self.load_map)
    
    def load_map(self, *args):
        docs = db.collection('objects').where('output', '==', True).stream()
        for doc in docs:
            map_long = doc.get("longitude")
            map_lat = doc.get("latitude")
        marker = MapMarkerPopup(lat = map_lat, lon = map_long, source = "download.png")
        self.ids.maps.add_widget(marker)
        self.ids.maps.center_on(map_lat, map_long)
        
class BackgroundColor(Widget):
    pass

class MainScreen(Screen):
    def on_enter(self):
        Clock.schedule_once(self.load_buttons)

    def load_buttons(self,*args):
        docs = db.collection('objects').stream()
        layout = GridLayout(cols = 1, spacing = 5, size_hint_y = None)
        layout.bind(minimum_height = layout.setter('height'))
        for doc in docs:
            button = RoundedButton(text = doc.get("specificType"), size_hint_y = None, height = 100)
            layout.add_widget(button)  
        root = ScrollView(size_hint = (1, None), size = (Window.width, Window.height))
        root.add_widget(layout)
        self.ids.grids.add_widget(root)

    def refresh(self, tags):
        for c in list(self.ids.grids.children):
            if isinstance(c, ScrollView): 
                self.ids.grids.remove_widget(c)
        tags = tags.lower()
        docs = db.collection('objects').where('type', '==', tags).stream()
        layout = GridLayout(cols = 1, spacing = 5, size_hint_y = None)
        layout.bind(minimum_height = layout.setter('height'))
        if tags == '':
            docs = db.collection('objects').stream()
            for doc in docs:
                button = RoundedButton(text = doc.get("specificType"), size_hint_y = None, height = 100)
                layout.add_widget(button)
        else:
            for doc in docs:
                button = RoundedButton(text = doc.get("specificType"), size_hint_y = None, height = 100)
                layout.add_widget(button)
        root = ScrollView(size_hint = (1, None), size = (Window.width, Window.height))
        root.add_widget(layout)
        self.ids.grids.add_widget(root)
    
    def add_object(self):
        self.manager.transition.direction = "right"
        self.manager.current = "donate_screen"

class DonateScreen(Screen):
    def returns(self):
        self.manager.transition.direction = "left"
        self.manager.current = "main_screen"
    
    def transfer_data(self, ty, spty, laa, loo):
        data = {
            'type': ty,
            'specificType': spty,
            'latitude': float(laa),
            'longitude': float(loo),
            'output': False
        }
        alpha = ['a','b','c','d']
        beta = ['a','b','c','d']
        numa = ['1','2','3','4','5']
        a = random.choice(alpha)
        b = random.choice(beta)
        n = random.choice(numa)
        c = a + b + n
                    
        db.collection(u'objects').document(c).set(data)
        self.ids.types.text = ''
        self.ids.spectype.text = ''
        self.ids.lats.text = ''
        self.ids.longs.text = ''

class MainApp(App):

    def build(self):
        self.screen_manager = RootWidget()
        return self.screen_manager

class RootWidget(ScreenManager):
    pass


mainapp = MainApp()
if __name__ == "__main__":
    mainapp.run()
