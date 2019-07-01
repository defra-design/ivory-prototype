// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

if ($('#dummiesToShow').attr('data-trigger') == "true") {
  $('#dragDropInstructions, #cantUploadDetails, #help-uploading, #drop-area').hide();
  $('#fileUploadedBox, #fileAlreadyUploaded').show();
  $('[name="select-file-type"]').closest('.govuk-radios').addClass('govuk-radios--has-items');
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  document.getElementById('dragDropInstructions').classList.add('hidden')
  document.getElementById('progressContainer').classList.remove('hidden')

  if(numFiles === 1) {

  } else {
    $('#thisUploadHeading').text('These are your uploads')
  }

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total)
  progressBar.value = total
}

function handleFiles(files) {
  files = Array.from(files)
  initializeProgress(files.length)
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()

  let fileType = file.type;
  let fileName = file.name;

  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')

    if(fileType.includes('image') ) {
      img.src = reader.result
    } else {
      $('#gallery').append('<p class="govuk-body">'+fileName+'<br>(Preview unavailable)</p>')
    }
    
    document.getElementById('fileUploadedBox').classList.remove('hidden')
    $('[name="select-file-type"]').closest('.govuk-radios').parent('fieldset').closest('.govuk-radios').addClass('govuk-radios--has-items');
    $('.govuk-fieldset__legend--m').hide();

    if(document.getElementById('help-uploading')) {
      document.getElementById('cantUploadDetails').classList.add('hidden')  
      document.getElementById('help-uploading').classList.add('hidden')
    }
    
    document.getElementById('drop-area').classList.add('hidden')
    
    if(fileType.includes('image') ) {
      document.getElementById('gallery').appendChild(img)
    }
    document.getElementById('theNameOfFile').value = "File uploaded: " + file.name
    document.getElementById('theNameOfFile').focus()  
  }
}

function uploadFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/henryneves/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'cswfg8zn')
  formData.append('file', file)
  xhr.send(formData)
}

$('.upload-arrow-container').on('click', function() {
  $('#fileElem').trigger('click');
});

$('#saveUploadTypeBtn button').on('click', function(e) {
  e.preventDefault();
  $(this).hide();
  $('#addMoreBtnContainer').show();  
  $('[name="select-file-type"]').prop('checked', false).closest('.govuk-form-group').hide();
})