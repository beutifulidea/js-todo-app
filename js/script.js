/** @format */

//Add New task
function addNewTask(e) {
	//prevent refresh the page
	e.preventDefault();
	//task title
	const content = $("input[type=text]").val();
	//create object with the title
	const newTask = {
		content,
		isDone: false,
	};
	//get previous tasks
	let tasks = localStorage.getItem("tasks");
	//check  if exists previous tasks or not
	if (tasks != null) {
		tasks = JSON.parse(tasks);
		tasks.push(newTask);
	} else {
		tasks = [newTask];
	}
	document.querySelector("#task-title").value = "";
	//convert object to string before storing in the localStorage
	tasks = JSON.stringify(tasks);
	//store the task in the localStorage
	localStorage.setItem("tasks", tasks);
	//list all tasks
	getTasks();
}

//get all Tasks
function getTasks() {
	//get tasks from the loacalStorage
	let tasks = localStorage.getItem("tasks");
	//check if tasks exists or not
	if (tasks != null) {
		//convert string to object array
		tasks = JSON.parse(tasks);
		//rows of the html table
		let rows = "";
		//row table index
		let index = 1;
		//task is check or not
		let checked = "";
		for (let i in tasks) {
			//check if taks has checked or not
			if (tasks[i].isDone) {
				checked = "checked";
			} else {
				checked = "";
			}
			/*rows += `<tr>
                <td>${index}</td>
                <td>${tasks[i].content}</td>
                <td><button>Delete</button></td>
                <td><input type="checkbox"></td>
                </tr>`;*/
			//make  rows of tasks
			rows +=
				"<tr>" +
				"<td>" +
				index +
				"</td>" +
				" <td>" +
				tasks[i].content +
				"</td>" +
				"<td><button onclick='deleteTask(this)'>حذف تسک</button></td>" +
				'<td><input type="checkbox" onchange="checkTask(this)" ' +
				checked +
				"></td>" +
				"</tr>";
			index++; //index of the row
		}
		//append rows to the table
		$("table tbody").html(rows);
	}
}
function deleteTask(el) {
	//index of the seleted row
	const selectedIndex = $(el).parents("tr").index();
	//read all taks
	let tasks = localStorage.getItem("tasks");
	//convert tasks to object array
	tasks = JSON.parse(tasks);
	//delete selted array element
	tasks.splice(selectedIndex, 1);
	//stroe tasks to localstorage
	localStorage.setItem("tasks", JSON.stringify(tasks));
	//get all tasks
	getTasks();
}

function checkTask(el) {
	//find the inded of the table row
	const selectedIndex = $(el).parents("tr").index();
	//get all tasks
	let tasks = localStorage.getItem("tasks");
	//check is tasks exist or not
	if (tasks != null) {
		//convert tasks to an array
		tasks = JSON.parse(tasks);
		//change the tasks state
		tasks[selectedIndex].isDone = !tasks[selectedIndex].isDone;
		//convert the tasks to string
		tasks = JSON.stringify(tasks);
		//store the tasks
		localStorage.setItem("tasks", tasks);
	}
}

//get all tasks
getTasks();
