var selectedFile;

var metadata = {
  contentType: 'image/jpeg',
};

$('#pictures').on("change", function(event) {
  db.collection('partners/'+localStorage.selID+'/images').get().then(val => {
      val.forEach(img => {
          img.ref.delete();
      });
  });

  for (var i = 0; i < event.target.files.length; i++) {
    selectedFile = event.target.files[i];
    uploadFile();
  };
  
  localStorage.imgsAdded=true;
  //location.reload(); 
});

function uploadFile(){
    var fileName=selectedFile.name;
    var storageRef = firebase.storage().ref('/images/'+fileName);
    
    var uploadTask=storageRef.put(selectedFile, metadata);
    
    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, function(error){console.log(error);},
    function(){
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        db.collection('partners/'+localStorage.selID+'/images').add(
          {url: downloadURL}
        ); 
      });
  });
};


var selectedLogo;

$('#logo').on("change", function(event) {
  selectedLogo = event.target.files[0];
  uploadLogo();
});

function uploadLogo(){
  var fileName=selectedLogo.name;
  console.log(fileName);
  var storageRef = firebase.storage().ref('/images/'+fileName);
  
  var uploadTask=storageRef.put(selectedLogo, metadata);
  
  uploadTask.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING:
        console.log('Upload is running');
        break;
    }
  }, function(error){console.log(error);},
  function(){
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      db.collection('partners').doc(localStorage.selID).update(
        {urlLogo: downloadURL}
      );  
    });
});
};