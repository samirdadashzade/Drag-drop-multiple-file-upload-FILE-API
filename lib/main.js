"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.onload = function () {
  var uploadedImageCount = 0;
  var tableWrapper = document.querySelector('.table-wrapper');
  var table = document.querySelector('.upload-table');
  var btnMoreFiles = document.querySelector('.more-files');
  var btnClearAll = document.querySelector('.clear-all');
  var uploadArea = document.querySelector('.upload-area'); //FILE API - HTML5 new API
  //File, FileList, FileReader

  document.querySelector('.upload').onclick = function () {
    this.nextElementSibling.click();
  };

  btnMoreFiles.onclick = function () {
    document.querySelector('#fileUpload').click();
  };

  btnClearAll.onclick = function () {
    tableWrapper.classList.remove("show");
    setTimeout(function () {
      table.lastElementChild.innerHTML = "";
      uploadedImageCount = 0;
    }, 1000);
  };

  uploadArea.ondragover = function (e) {
    e.preventDefault();
    this.classList.add("dragover");
  };

  uploadArea.ondragleave = function (e) {
    this.classList.remove("dragover");
  };

  uploadArea.ondrop = function (e) {
    e.preventDefault();
    ImagesUploader(_toConsumableArray(e.dataTransfer.files));
    tableWrapper.classList.add("show");
    uploadArea.classList.remove("dragover");
  }; //listen to the change event of file


  document.querySelector('#fileUpload').onchange = function (e) {
    ImagesUploader(_toConsumableArray(e.target.files));
    tableWrapper.classList.add("show");
  };

  function ImagesUploader(files) {
    files.forEach(function (file) {
      if (file.type.match("image/*")) {
        var reader = new FileReader();

        reader.onloadend = function (event) {
          uploadedImageCount++;
          var tr = document.createElement('tr');
          var tdNo = document.createElement('td');
          tdNo.innerText = uploadedImageCount;
          var tdImage = document.createElement('td');
          var image = document.createElement('img');
          image.classList.add("img-thumbnail", "upload-image");
          image.src = event.target.result;
          tdImage.appendChild(image);
          var tdName = document.createElement('td');
          tdName.innerText = file.name;
          var tdSize = document.createElement('td');
          tdSize.innerText = (file.size / 1024).toFixed(2);
          var tdDelete = document.createElement('td');
          var icon = document.createElement('i');
          icon.className = "fas fa-trash-alt";
          tdDelete.appendChild(icon);

          icon.onclick = function () {
            //recursively go to all nextElementSiblings and update No.
            var currentTr = tr;

            while (currentTr.nextElementSibling) {
              currentTr.nextElementSibling.firstElementChild.innerText -= 1;
              currentTr = currentTr.nextElementSibling;
            }

            tr.remove();
            uploadedImageCount--;
          };

          tr.appendChild(tdNo);
          tr.appendChild(tdImage);
          tr.appendChild(tdName);
          tr.appendChild(tdSize);
          tr.appendChild(tdDelete);
          table.lastElementChild.appendChild(tr);
        };

        reader.readAsDataURL(file); // reader.onprogress = function(ev){}
      }
    });
  }
};