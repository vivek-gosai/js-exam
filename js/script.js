
let taskD = document.getElementById("task");
let list = document.getElementById("list");
let isEdit = false;
let isIndex;
let getData = () => {
    let data = JSON.parse(localStorage.getItem('tasks'));

    if (data) {
        return data;
    } else {
        return [];
    }
}
let storage = getData();
const formData = () => {
    event.preventDefault();
    let taskData = {
        id: isIndex ? isIndex : Math.floor(Math.random() * 100000),
        task: taskD.value
    }
    // console.log(taskData);
if (isEdit) {
        let update = [...storage];
        let updateData = update.map((rec) => {
            if (rec.id == isIndex) {
                return taskData;
            } else {
                return rec;
            }
        })
        storage = updateData;
        isEdit = false;
        isIndex = undefined;

    } else {
        storage = [...storage, taskData];
    }

    taskD.value = "";
    localStorage.setItem('tasks', JSON.stringify(storage));

    viewData();
}
const viewData = () => {

    list.innerHTML = "";

    storage.forEach((rec,index) => {
        list.innerHTML +=`
        <td class="fw-bold">${index+1}</td>
        <td class="fw-bold">${rec.task}</td>
        <td>
            <button class="btn btn-primary" onclick="return editData(${rec.id})">Edit</button>
            <button class="btn btn-danger" onclick="return deleteData(${rec.id})">Delete</button>
        </td>
        `
    });
}
viewData();

const editData = (id) => {
    let record = [...storage];
    let singleRec = record.filter((rec) => {
        return rec.id == id;
    })
    taskD.value = singleRec[0].task;
    isEdit = true;
    isIndex = id;
    // console.log("done");
}
const deleteData = (id) => {
    let record = [...storage];
    let deleteRecord = record.filter((rec) => {
        return rec.id != id;
    })
    localStorage.setItem('tasks', JSON.stringify(deleteRecord));
    storage = getData();
    viewData();
    // console.log("hello");
}