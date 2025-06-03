
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
urlpatterns = [
 
    path('face/enrol', views.enrol_user_face),
    path('fingerprint/enrol', views.enrol_user_fingerprint),
    
    path('face/verifyUser', views.face_verify_user),
    path('fingerprint/verifyUser', views.verify_fingerprint),
    
    
    path('download/media/test/<str:pk>', views.download_test_file),
    
    
] +  static( settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

