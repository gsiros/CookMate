import cv2
def detect_bounding_box(vid, face_classifier):
    grayscale_image  = cv2.cvtColor(vid, cv2.COLOR_BGR2GRAY) 
    faces = face_classifier.detectMultiScale(
        grayscale_image,scaleFactor=1.1,minNeighbors=5,minSize=(40,40)
    )

    for (x, y, w, h) in faces: 
        cv2.rectangle(vid, (x, y), (x + w, y + h), (0, 255, 0), 4) 

    return faces 
