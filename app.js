// UI değişkenlerini tanımlama
const taskInput = document.getElementById('task');
const taskList = document.getElementById('list');
const addButton = document.getElementById('liveToastBtn');
const delButton = document.querySelector('.close');
const clearButton = document.querySelector('#clearBtn');

// Bütün event listenerları yükle
loadEventListeners();

// Bütün eventleri yükleme fonksiyonu
function loadEventListeners() {
  // DOM Yüklenme Eventi (local storage üzerinde kayıtlı olan bilgiyi çağırmak için)
  document.addEventListener('DOMContentLoaded', getTasks);
  // Task Ekleme Eventi
  addButton.addEventListener('click', addElement);
  // Task Silme Eventi
  taskList.addEventListener('click', removeElement);
  // Bütün Taskleri Silme Eventi
   clearButton.addEventListener('click', clearElements);
   // Tasklerin üstünü çizme ve geri alma (Tamamlandı) Eventi
   taskList.addEventListener('click', finishedTask);
}

// Local Storage'dan Kayıtlı Bilgiyi Çağırma - Function 
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    // List elementi (li) oluşturma 
    const li = document.createElement('li');
    // Oluşturduğumuz li'ye class ekleme
    li.className = 'new-task'
    // Text node oluşturup li'ye ekleme (append)
    li.appendChild(document.createTextNode(task));
    // X butonu için yeni span elementi oluşturma
    const span = document.createElement('span');
    // X butonu (span)'a class ekleme
    span.className = 'close'; 
    // X butonununa innerHTML ekleme
    span.innerHTML = "×";
    // X butonunu li içerisine ekleme (append)
    li.appendChild(span);
    // Check butonu için span elementi oluşturma
    const spanCheck = document.createElement('span');
    // Check butonuna class ekleme
    spanCheck.className = 'check';
    // Check butonuna innHTML ekleme
    spanCheck.innerHTML = "&#10004;";
    // Check butonunu li'ye ekleme (append)
    li.appendChild(spanCheck);
    // Oluşturduğumuz bütün bu li elementini UI'a ekleme
    taskList.appendChild(li);
  });
}

// Task Ekleme - Function
function addElement(e) {
  // Input'un içi boşsa alert (toast) verme
  if(taskInput.value.length === 0) {
    $('#liveToastError').toast('show');
    li.removeChild(); // Alertten sonra boş "li" ekleniyor, burası onu kaldırmak için.
  }
  // List elementi (li) oluşturma 
  const li = document.createElement('li');
  // Oluşturduğumuz li'ye class ekleme
  li.className = 'new-task'
  // Text node oluşturup li'ye ekleme (append)
  li.appendChild(document.createTextNode(taskInput.value));
  // X butonu için yeni span elementi oluşturma
  const span = document.createElement('span');
  // X butonu (span)'a class ekleme
  span.className = 'close'; 
  // X butonununa innerHTML ekleme
  span.innerHTML = "×";
  // X butonunu li içerisine ekleme (append)
  li.appendChild(span);
  // Check butonu için span elementi oluşturma
  const spanCheck = document.createElement('span');
  // Check butonuna class ekleme
  spanCheck.className = 'check';
  // Check butonuna innHTML ekleme
  spanCheck.innerHTML = "&#10004;";
  // Check butonunu li'ye ekleme (append)
  li.appendChild(spanCheck);
  // Oluşturduğumuz bütün bu li elementini UI'a ekleme
  taskList.appendChild(li);
  // li UI'a eklendiği için alert (toast) verme
  $('#liveToast').toast('show');
  // LocalStorage'a Ekleme
  storeTaskInLocalStorage(taskInput.value);
  
  // Input'un içindeki değeri temizleme
  taskInput.value = "";

  e.preventDefault();
}

// Local Storage Ekleme - Function
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Task Silme - Function
function removeElement(e) {
  if(e.target.className == "close") {
  e.target.parentElement.remove();

  // Local Storage'dan Silme
  removeTaskFromLocalStorage(e.target.parentElement);
  }
}

// Local Storage'dan Silme - Function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Bütün Taskleri Silme - Function
function clearElements() {
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Bütün Taskleri Local Storage'dan Sil
  clearTasksFromLocalStorage();
}

// Bütün Taskleri Local Storage'dan Kaldırma - Function
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


// Üzerini Çizme ve Çizgiyi Kaldırma - Function
function finishedTask(e) {
  if(e.target.className === "check") {
    e.target.parentElement.classList.add("finished-task");
  } else if(e.target.classList.contains("finished-task")) { // Üzeri çizilmişse iptal etme - kaldırma
    e.target.classList.remove("finished-task")
  }
}

