import requests

API_KEY = "YOUR_GOOGLE_API_KEY"

def get_address_from_coordinates(lat, lng):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={API_KEY}"
    response = requests.get(url)
    data = response.json()
    
    if data["status"] == "OK":
        return data["results"][0]["formatted_address"]
    else:
        return "Location not found"

def get_coordinates_from_address(address):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={API_KEY}"
    response = requests.get(url)
    data = response.json()

    if data["status"] == "OK":
        location = data["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]
    else:
        return None, None
