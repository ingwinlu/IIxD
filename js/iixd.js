var handleFileSelect = function(evt) {
    var file = evt.target.files[0];
    previewImage(file);
};

var handleFileDrop = function(evt) {
    evt.preventDefault();
    var file = evt.originalEvent.dataTransfer.files[0];
    previewImage(file)
};

var previewImage = function(image) {
    if(!image) return;
    var reader = new FileReader();

    reader.onload = function(readerEvt) {
        var binaryString = readerEvt.target.result;
        var base64String = btoa(binaryString);
        var imageTag = $('<img />', {
            src: 'data:image;base64,' + base64String,
            alt: 'preview'
        });
        $('#previewarea').empty().append(imageTag);
    };
    reader.readAsBinaryString(image);
};

$( document ).ready(function() {
    $('#fotoinput').change(handleFileSelect);

    $('#previewarea').on('dragover', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $(this).addClass('dragged');
    });
    $('#previewarea').on('dragleave', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $(this).removeClass('dragged');
    });
    $('#previewarea').on('drop', handleFileDrop);
});
