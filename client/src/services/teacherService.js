const API = "http://localhost:5000/api/teacher";

export const getDashboard = async () => {
  const res = await fetch(`${API}/dashboard`);
  return res.json();
};

export const getStudents = async () => {
  const res = await fetch(`${API}/students`);
  return res.json();
};

export const getAttendance = async () => {
  const res = await fetch(`${API}/attendance`);
  return res.json();
};

export const getGrades = async () => {
  const res = await fetch(`${API}/grade`);
  return res.json();
};

export const getAssignments = async () => {
  const res = await fetch(`${API}/assignments`);
  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${API}/profile`);
  return res.json();
};