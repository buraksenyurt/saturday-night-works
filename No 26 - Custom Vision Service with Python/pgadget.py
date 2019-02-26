# -*- coding: utf-8 -*-

# Custom Vision API'sini kullanabilemek için gerekli modüllerin bildirimi ile işe başladık
from azure.cognitiveservices.vision.customvision.training import CustomVisionTrainingClient
from azure.cognitiveservices.vision.customvision.training.models import ImageFileCreateEntry

# Eğitici servise ait endpoint bilgisi
apiEndpoint = "https://southcentralus.api.cognitive.microsoft.com"

# Bizim için üretiken traning ve prediction key değerleri
tKey = "c3a53a4fb5f24137a179f0bcaf7754a5"
pKey = "bf7571576405446782543f832b038891"

# Eğitmen istemci nesnesi tanımlanıyor. İlk parametre traning_key
# ikinci parametre Cognitive servis adresi
coach_Rives = CustomVisionTrainingClient(tKey, endpoint=apiEndpoint)

# Projeyi oluşturuyoruz
print("Lego projesi oluşturuluyor")
legoProject = coach_Rives.create_project("Agent_Leggooo")  # projemizin adı

# Şimdi deneme amaçlı tag'ler oluşturup bu tag'lere çeşitli fotoğraflar yükleyeceğiz
technic = coach_Rives.create_tag(legoProject.id, "technic")
city = coach_Rives.create_tag(legoProject.id, "city")

# Aşağıdaki tag'ler şu anda yorum satırı. Bunları açıp, create_images_from_files metodlarındaki tag_ids dizisine ekleyebiliriz.
# Ancak Vision servisi her tag için en az beş adete fotoğraf olmasını istiyor. Bu kümeyi örnekleyemediğim için sadece iki tag ile ilerledim.

'''
helicopter = coach_Rives.create_tag(legoProject.id, "helicopter")
truck = coach_Rives.create_tag(legoProject.id, "truck")
yellow = coach_Rives.create_tag(legoProject.id, "yellow")
plane = coach_Rives.create_tag(legoProject.id, "plane")
car = coach_Rives.create_tag(legoProject.id, "car")
racecar = coach_Rives.create_tag(legoProject.id, "racecar")
f1car = coach_Rives.create_tag(legoProject.id, "f1car")
crane = coach_Rives.create_tag(legoProject.id, "crane")
building = coach_Rives.create_tag(legoProject.id, "building")
station = coach_Rives.create_tag(legoProject.id, "station")
orange = coach_Rives.create_tag(legoProject.id, "orange")
'''

file_name = "Images/technic/choper.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[technic.id])])

file_name = "Images/technic/f1car.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[technic.id])])

file_name = "Images/technic/truck.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[technic.id])])

file_name = "Images/technic/truck_2.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[technic.id])])

file_name = "Images/technic/vinc.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[technic.id])])

file_name = "Images/city/plane.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[city.id])])

file_name = "Images/city/policestation.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[city.id])])

file_name = "Images/city/porsche.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[city.id])])

file_name = "Images/city/racecar.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[city.id])])

file_name = "Images/city/snowmobile.jpg"
with open(file_name, mode="rb") as image_contents:
    coach_Rives.create_images_from_files(legoProject.id, [ImageFileCreateEntry(
        name=file_name, contents=image_contents.read(), tag_ids=[city.id])])

# Fotoğrafları çeşitli tag'ler ile ilişkilendirdiğimize göre öğretimi başlatabiliriz

print("lego fotoğraflarım için eğitim başlıyor")
iteration = coach_Rives.train_project(legoProject.id)
while (iteration.status != "Completed"):
    iteration = coach_Rives.get_iteration(legoProject.id, iteration.id)
    print("Durum..." + iteration.status)

coach_Rives.update_iteration(legoProject.id, iteration.id, is_default=True)
print("Eğitim tamamlandı...")
