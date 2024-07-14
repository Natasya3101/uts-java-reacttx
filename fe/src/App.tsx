import { useEffect, useState } from "react";

export interface Employee {
  id: number;
  name: string;
  email: string;
  jabatan: string;
  divisi: string;
  gaji: number;
}

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editEmployee, setEditEmployee] = useState<Partial<Employee>>({
    id: 0,
    name: "",
    email: "",
    jabatan: "",
    divisi: "",
    gaji: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterJabatan, setFilterJabatan] = useState("");
  const [filterGaji, setFilterGaji] = useState<number | "">("");
  const [filterDivisi, setFilterDivisi] = useState("");

  useEffect(() => {
    fetch("/api/getAll")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  function handleDelete(id: number) {
    fetch(`/api/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
        } else {
          console.error("Error deleting employee");
        }
      })
      .catch((error) => console.error("Error deleting employee:", error));
  }

  function handleEdit() {
    const updatedEmployee = { ...editEmployee };

    // Optimistically update the UI
    setEmployees((prevEmployees) =>
      prevEmployees.map((e) => (e.id === updatedEmployee.id ? updatedEmployee as Employee : e))
    );

    fetch(`/api/edit/${editEmployee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmployee),
    })
      .then(() => {
        setEditEmployee({ id: 0, name: "", email: "", jabatan: "", divisi: "", gaji: 0 });
      })
      .catch((error) => {
        console.error("Error editing employee:", error);
      });
  }

  function handleAdd() {
    const newEmployee = { ...editEmployee, id: Date.now() }; // Temporary ID for optimistic update

    // Optimistically add the new employee
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee as Employee]);

    fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editEmployee),
    })
      .then((response) => response.json())
      .then((addedEmployee) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((e) => (e.id === newEmployee.id ? addedEmployee : e))
        );
        setEditEmployee({ id: 0, name: "", email: "", jabatan: "", divisi: "", gaji: 0 }); // Clear the form
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  }

  const formatGaji = (gaji: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(gaji);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterJabatan === "" || employee.jabatan === filterJabatan) &&
    (filterGaji === "" || employee.gaji <= filterGaji) &&
    (filterDivisi === "" || employee.divisi === filterDivisi)
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => 
    sortOrder === "asc" ? a.gaji - b.gaji : b.gaji - a.gaji
  );

  return (
    <div className="p-4 flex">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4 text-center" >Employee</h1>

        {/* Search, Filter, and Sort */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          
          <select
            value={filterJabatan}
            onChange={(e) => setFilterJabatan(e.target.value)}
            className="border p-2 rounded mr-2"
          >
            <option value="">Filter by position (jabatan)</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>

          <select
            value={filterDivisi}
            onChange={(e) => setFilterDivisi(e.target.value)}
            className="border p-2 rounded mr-2"
          >
            <option value="">Filter by division (divisi)</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="SDM">SDM</option>
            <option value="IT">MARKETING</option>


          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border p-2 rounded gap-3"
          >
            <option value="asc">Sort Gaji (Low to High)</option>
            <option value="desc">Sort by Gaji (High to Low)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sortedEmployees.map((employee) => (
    <div key={employee.id} className="flex flex-col justify-between p-4 border rounded-lg shadow-md">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{employee.name}</h2>
        <p className="text-gray-600">{employee.email}</p>
        <p className="text-gray-600">{employee.jabatan}</p>
        <p className="text-gray-600">{employee.divisi}</p>
        <p className="text-gray-600">{formatGaji(employee.gaji)}</p>
      </div>
      <div className="flex space-x-7 mt-4">
        <button onClick={() => handleDelete(employee.id)} className="bg-pink-300 text-white p-2 rounded">Delete</button>
        <button onClick={() => setEditEmployee(employee)} className="bg-purple-300 text-white p-2 rounded">Edit</button>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* FORM */}
      <form
  onSubmit={(e) => {
    e.preventDefault();
    if (editEmployee.id) {
      handleEdit();
    } else {
      handleAdd();
    }
  }}
  className="ml-4 flex flex-col space-y-5"
>
  <h2 className="text-xl font-semibold">Add/Edit Employee</h2>
  
  {['name', 'email', 'jabatan', 'divisi'].map((field) => (
    <label key={field} htmlFor={field} className="font-medium text-10px">
      {field.charAt(0).toUpperCase() + field.slice(1)}
      <input
        type={field === 'email' ? 'email' : 'text'}
        id={field}
        value={editEmployee[field]}
        onChange={(e) => setEditEmployee({ ...editEmployee, [field]: e.target.value })}
        className="border p-2 rounded w-full text-10px"
        required
      />
    </label>
  ))}

  <label htmlFor="gaji" className="font-medium text-10px">
    Gaji
    <input
      type="number"
      id="gaji"
      value={editEmployee.gaji}
      onChange={(e) => setEditEmployee({ ...editEmployee, gaji: parseInt(e.target.value) })}
      className="border p-2 rounded w-full text-10px"
      required
    />
  </label>

  <button type="submit" className="bg-blue-600 text-white p-2 rounded text-10px">Save</button>
</form>

    </div>
  );
}
