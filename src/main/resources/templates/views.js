let API_EMPLOYEE = "http://localhost:8080/employees"
let API_DEPARTMENT = "http://localhost:8080/departments"
showAll();
function showAll() {
    axios.get(API_EMPLOYEE).then((res) => {
        let list = res.data
        document.getElementById("showsEmployee").innerHTML = ''
        let str = `<table class="table table-striped">
                            <thead>
                            <tr>
                              <th scope="col">EmployeeCode</th>
                              <th scope="col">Name</th>
                              <th scope="col">Age</th>
                              <th scope="col">Salary</th>
                              <th scope="col">Department</th>
                              <th scope="col" colspan="2">Action</th>
                            </tr>
                          </thead>
                          <tbody>`
        for (let i = 0; i < list.length; i++) {
            str += ` <tr>
                              <th>${list[i].employeeCode}</th>
                              <td><a style="cursor: pointer" onclick="showDetail(${list[i].id})">${list[i].name}</a></td>
                              <td>${list[i].age}</td>
                              <td>${list[i].salary}</td>
                              <td>${list[i].department.name}</td>
                              <td><button type="button" class="btn btn-primary"><a style="cursor: pointer" onclick="editEmployee(${list[i].id})">Update</a> </button></td>
                              <td><button type="button" class="btn btn-primary"><a style="cursor: pointer" onclick="deleteEmployee(${list[i].id})">Delete</a></button></td>
                            </tr>`
        }
        str += `</tbody>
        </table>`
        document.getElementById("showsEmployee").innerHTML = str
    })
}
function showDetail(idEmployee) {
    axios.get(API_EMPLOYEE + '/' + idEmployee).then((res)=>{
        let employee = res.data;
        document.getElementById("showsEmployee").innerHTML = ''
        let str = `
                       <h2><b>Employee Detail</b></h2>
                       <p><b>Name: ${employee.name}</b></p>
                       <p><b>Salary: ${employee.salary}</b></p>
                       <p><b>Age: ${employee.age}</b></p>
                       <p><b>Department: ${employee.department.name}</b></p>
                       <p><a style="cursor: pointer" onclick="showAll()">Back to list</a> </p>
                            `
        document.getElementById("showsEmployee").innerHTML = str
    })
}
function showFormAdd() {
    document.getElementById('showsEmployee').innerHTML = '';
    let str =
        `
    
    <div class="form-group">
        <label for="code">EMPLOYEE CODE</label>
        <input style="width: 300px;" type="text" class="form-control" id="code" placeholder="CODE">
    </div>
        <div class="form-group">
        <label for="name">NAME</label>
        <input style="width: 300px;" type="text" class="form-control" id="name" placeholder="NAME">
    </div>
        <div class="form-group">
        <label for="age">AGE</label>
        <input style="width: 300px;" type="number" class="form-control" id="age" placeholder="AGE">
    </div>
        <div class="form-group">
        <label for="salary">SALARY</label>
        <input style="width: 300px;" type="number" class="form-control" id="salary" placeholder="SALARY">
    </div>
    <select style="width: 300px;" id="department" class="form-control">
        `;
    axios.get(API_DEPARTMENT).then((res) => {
        let departments = res.data;
        for (let i = 0; i < departments.length; i++) {
            str +=
                `
                <option value="${departments[i].id}">${departments[i].name}</option>
                `
        }
        str +=
            `
             </select>
             <div>
             <button class="btn btn-primary" onclick="save()">Create</button>
             </div>
            
            `
        document.getElementById('showsEmployee').innerHTML = str
    })
}
function save() {
    console.log(document.getElementById('code').value)
    let data = {
        employeeCode: document.getElementById('code').value,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        salary: document.getElementById('salary').value,
        department: {
            id: document.getElementById('department').value
        }
    }
    axios.post(API_EMPLOYEE, data).then((res) => {
        alert('Create Success')
        showAll()
    })
}

function deleteEmployee(idEmployee) {
    axios.delete(API_EMPLOYEE + '/' + idEmployee).then((res)=>{
        alert('Delete Success')
        showAll()
    })
}
function editEmployee(idEmployee) {
    Promise.all([
        axios.get(API_EMPLOYEE + '/' + idEmployee),
        axios.get(API_DEPARTMENT)
    ]).then((res)=>{
        let employee = res[0].data;
        let departments = res[1].data;
        let str = `
         <div class="form-group">
        <label for="code">EMPLOYEE CODE</label>
        <input style="width: 300px;" type="text" class="form-control" id="codeEdit" value="${employee.employeeCode}">
    </div>
        <div class="form-group">
        <label for="name">NAME</label>
        <input style="width: 300px;" type="text" class="form-control" id="nameEdit" value="${employee.name}">
    </div>
        <div class="form-group">
        <label for="age">AGE</label>
        <input style="width: 300px;" type="number" class="form-control" id="ageEdit" value="${employee.age}">
    </div>
        <div class="form-group">
        <label for="salary">SALARY</label>
        <input style="width: 300px;" type="number" class="form-control" id="salaryEdit" value="${employee.salary}">
    </div>
    <select style="width: 300px;" id="departmentEdit" class="form-control">
        `
        for (let i = 0; i < departments.length; i++) {
            str +=
                `
                <option value="${departments[i].id}">${departments[i].name}</option>
                `
        }
        str +=
            `
             </select>
             <div>
             <button class="btn btn-primary" onclick="saveEdit(${employee.id})">Edit</button>
             </div>
            
            `
        document.getElementById('showsEmployee').innerHTML = str
    })
}
function saveEdit(idEmployee) {
    console.log(document.getElementById('codeEdit').value)
    let data = {
        employeeCode: document.getElementById('codeEdit').value,
        name: document.getElementById('nameEdit').value,
        age: document.getElementById('ageEdit').value,
        salary: document.getElementById('salaryEdit').value,
        department: {
            id: document.getElementById('departmentEdit').value
        }
    }
    axios.put(API_EMPLOYEE + '/' + idEmployee, data).then((res) => {
        alert('Create Success')
        showAll()
    })
}
function showFormSortI() {
    axios.get(API_EMPLOYEE + '/sortI').then((res) => {
        let list = res.data
        document.getElementById("showsEmployee").innerHTML = ''
        let str = `<table class="table table-striped">
                            <thead>
                            <tr>
                              <th scope="col">EmployeeCode</th>
                              <th scope="col">Name</th>
                              <th scope="col">Age</th>
                              <th scope="col">Salary</th>
                              <th scope="col">Department</th>
                              <th scope="col" colspan="2">Action</th>
                            </tr>
                          </thead>
                          <tbody>`
        for (let i = 0; i < list.length; i++) {
            str += ` <tr>
                              <th>${list[i].employeeCode}</th>
                              <td><a style="cursor: pointer" onclick="showDetail(${list[i].id})">${list[i].name}</a></td>
                              <td>${list[i].age}</td>
                              <td>${list[i].salary}</td>
                              <td>${list[i].department.name}</td>
                              <td><button type="button" class="btn btn-primary"><a style="cursor: pointer" onclick="editEmployee(${list[i].id})">Update</a> </button></td>
                              <td><button type="button" class="btn btn-primary"><a style="cursor: pointer" onclick="deleteEmployee(${list[i].id})">Delete</a></button></td>
                            </tr>`
        }
        str += `</tbody>
        </table>`
        document.getElementById("showsEmployee").innerHTML = str
    })
}
function showFormSortD() {
    axios.get(API_EMPLOYEE + '/sortD').then((res) => {
        let list = res.data
        document.getElementById("showsEmployee").innerHTML = ''
        let str = `<table class="table table-striped">
                            <thead>
        }
        <tr>
                              <th scope="col">EmployeeCode</th>
                              <th scope="col">Name</th>
                              <th scope="col">Age</th>
                              <th scope="col">Salary</th>
                              <th scope="col">Department</th>
                              <th scope="col" colspan="2">Action</th>
                            </tr>
                          </thead>
                          <tbody>`
        for (let i = 0; i < list.length; i++) {
            str += ` <tr>
                              <th>${list[i].employeeCode}</th>
                              <td><a style="cursor: pointer" onclick="showDetail(${list[i].id})">${list[i].name}</a></td>
                              <td>${list[i].age}</td>
                              <td>${list[i].salary}</td>
                              <td>${list[i].department.name}</td>
                              <td><button type="button" class="btn btn-primary"><a style="cursor: pointer" onclick="editEmployee(${list[i].id})">Update</a> </button></td>
                              <td><button type="button" class="btn btn-primary"><a style="cursor: pointer" onclick="deleteEmployee(${list[i].id})">Delete</a></button></td>
                            </tr>`
        }
        str += `</tbody>
        </table>`
        document.getElementById("showsEmployee").innerHTML = str
    })
}
function showFormFindByDepartment() {
    axios.get(API_DEPARTMENT).then((res)=>{
        let list = res.data
        let str =  `
        <h2><b>Find By Department</b></h2>
            <select style="width: 300px;" id="departmentEdit" class="form-control">
            `
        for (let i = 0; i < departments.length; i++) {
            str +=
                `
            <option value="${departments[i].id}">${departments[i].name}</option>
                `
        }
        str +=
            `
            </select>
        <div>
            <button class="btn btn-primary" onclick="saveEdit(${employee.id})">Edit</button>
        </div>

            `
        document.getElementById('showsEmployee').innerHTML = str
    })
}