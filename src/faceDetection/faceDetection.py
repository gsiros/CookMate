import cv2 
from createBoundingBox import detect_bounding_box 

face_classifier = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

video_capture = cv2.VideoCapture(0) 

while True: 
    result, video_frame = video_capture.read() 
    #can't read from video capture  
    if result is False: 
        break 


    faces = detect_bounding_box(
            video_frame
    ) 

    cv2.imshow(
            "Face", video_frame 
    )

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

video_capture.release() 
cv2.destroyAllWindows() 
