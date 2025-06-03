import cv2
import numpy as np
import os
from .enhancement import histogramEqualizer, check_dark_background
from PIL import Image, ImageDraw
import random
import shutil
from supabase import create_client, Client

url = "https://ayijrjypaegwqtvtzfho.supabase.com"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5aWpyanlwYWVnd3F0dnR6ZmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODk1MjM5OCwiZXhwIjoyMDY0NTI4Mzk4fQ.GeVnAQ7anc6yLRn6ex8nRFNy2yskILrCSFO8sRtCECA"

supabase: Client = create_client(url, key)

def face_detection(input_img):
    input_img = cv2.cvtColor(input_img,cv2.COLOR_BGR2GRAY)
    
    face_haar = cv2.CascadeClassifier(r'C:\Users\ADMIN\PycharmProjects\hrs-3fa\hbs\Auth\backend\api\src\haarcascade_frontalface_default.xml')
    faces = face_haar.detectMultiScale(input_img,scaleFactor=1.2, minNeighbors=3)
    if len(faces) != 0:
        for (x,y,w,h) in faces:
            cv2.rectangle(input_img, (x,y), (x+w,y+h), (255,0,0), 2)
            input_img = input_img[y:y+h, x:x+w]
            break
    else: 
        return (), False
   
    return input_img, True

def enrol_face(input_img,user_id):
    image_enrolled = 0
    image_path = str(user_id)  +  '/img_00'+  str(image_enrolled) + '.jpeg'
    
    #upload image
    supabase.storage.from_('faces').upload(file=input_img,path=image_path)
    
    
 
    
    # check if the face is detected in the image and if the image has a good background
    input_img, status = face_detection(input_img)
    
    dark = check_dark_background(input_img)
    if dark:
        return {"enrolled":image_enrolled, "face_detected": False ,"dark":True, "done": False}
  
  
  
    if len(input_img) == 0:
        return {"face_detected": False, "enrolled": image_enrolled, "dark":False, "done": False}
    else:
        if image_enrolled == 100 :
            train_model()
            return {'enrolled': image_enrolled, "done": True, "dark":False}
        elif image_enrolled < 100:
            input_img = histogramEqualizer(input_img)
            dataset_name = dataset_base_path+  'img_00'+  str(image_enrolled) + '.jpeg'
            cv2.imwrite(dataset_name,input_img) 
            return {'enrolled': image_enrolled, "done": False, "dark":False}
        
        
    
    
def recognize_user(input_img):
        
    input_img, status = face_detection(input_img)
    if len(input_img) == 0:
        return {"face_detected": False, "confidence":100}
    else:
        print('Face found')    
        input_img = histogramEqualizer(input_img)
        face_recognizer = cv2.face.LBPHFaceRecognizer_create()
        face_recognizer.read(r"C:\Users\ADMIN\PycharmProjects\hrs-3fa\hbs\Auth\backend\api\src\training_data.yml")
        label, confidence = face_recognizer.predict(input_img)
        print(label)
        return {"face_detected": True, "label":label, "confidence":confidence}


 
def train_model():
     faces, faceID = supabase_labeller()
     face_recognizer = cv2.face.LBPHFaceRecognizer_create()   
     print('Training started .......')
     face_recognizer.train(np.array(faces) ,np.array(faceID))
     face_recognizer.save(r"C:\\Users\\ADMIN\\PycharmProjects\\hrs-3fa\\hbs\\Auth\\backend\\api\\src\\training_data.yml")
     print('Training Completed .......')
     
 
def supabase_labeller(user_id):
    faces = []
    faceImg = []
    faceID = []
    #get all files
    files = (supabase.storage.from_("faces").list(user_id))
    for file in files:
        with open("../../Datasets/Face/"+ str(file), "wb+") as f:
            response = (supabase.storage.from_("avatars").download(
                str(user_id)+ "/"+ str(file)
            )
        )
            f.write(response)

    dataset_base_path = "../../Datasets/Face/"     
    for path,subdirname, filenames in os.walk(dataset_base_path):
         for filename in filenames:
            id = os.path.basename(path)
            img_path = os.path.join(path,filename)
            test_img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            faces.append(test_img)
            faceID.append(int(id))
    return faces, faceID


def labeller():
    faces = []
    faceImg = []
    faceID = []
    dataset_base_path = "C:\\Users\\ADMIN\\PycharmProjects\\hrs-3fa\\hbs\\Auth\\backend\\Datasets\\Face\\"
    for path,subdirname, filenames in os.walk(dataset_base_path):
         for filename in filenames:
            id = os.path.basename(path)
            img_path = os.path.join(path,filename)
            test_img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            faces.append(test_img)
            faceID.append(int(id))
    return faces, faceID
   



def enrol_fingerprint(user_id):
    fake_fingerprint_path = "C:\\Users\\ADMIN\\PycharmProjects\\hrs-3fa\\hbs\\Auth\\backend\\Fingerprint\\"
    dest_path = "C:\\Users\\ADMIN\\PycharmProjects\\hrs-3fa\\hbs\\Auth\\backend\\Datasets\\Fingerprint\\" + str(user_id) 
    
    if not  os.path.exists(dest_path):
        os.makedirs(dest_path)
    
    file_to_move = os.listdir(fake_fingerprint_path)
    fingerprint_index = random.randint(1,len(file_to_move))
    full_fingerprint_path = os.path.join(fake_fingerprint_path,file_to_move[fingerprint_index])
    dest_path = os.path.join(dest_path,"fingerprint.jpg")
    shutil.move(full_fingerprint_path,dest_path)
    return  dest_path
    


def find_fingerprint_label(target_img):
    dataset_path = "C:\\Users\\ADMIN\\PycharmProjects\\hrs-3fa\\hbs\\Auth\\backend\\Datasets\\Fingerprint\\"
    for path, subdir, filenames in os.walk(dataset_path):
       for filename in filenames:
          file = os.path.join(path,filename)
          match_score = fingerprint_matcher(file,target_img)
          if match_score == 1:
              return int(path.split('\\')[len(path.split('\\'))-1])
    
    return "Unknown"
          
          
 



def fingerprint_matcher(template_path, target_img):
    template = cv2.imread(template_path, cv2.IMREAD_GRAYSCALE)
  
    target_img = cv2.cvtColor(target_img,cv2.COLOR_BGR2GRAY)
      
    sift = cv2.SIFT_create()
    
    kp1, des1 = sift.detectAndCompute(template,None)
    kp2, des2 = sift.detectAndCompute(target_img, None)
    
    FLANN_INDEX_KDTREE = 0
    index_params = dict(algorithm=FLANN_INDEX_KDTREE,trees=5)
    search_params = dict(checks=50)
    flann = cv2.FlannBasedMatcher(index_params, search_params)
    matches = flann.knnMatch(des1,des2,k=2)
    
    good_matches = []
    for m,n in matches:
        if m.distance < 0.7 * n.distance:
            good_matches.append(m)
    num_matches = len(good_matches)
    matching_score = num_matches /min(len(kp1),len(kp2))
    print(matching_score)
    return matching_score


