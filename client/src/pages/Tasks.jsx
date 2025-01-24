import AdminTasks from '../components/Tasks/AdminTasks';
import ManagerTasks from '../components/Tasks/ManagerTasks';
import EmployerTasks from '../components/Tasks/EmployerTasks';
import AdminMembers from '../components/Members/AdminMembers';
import ManagerMembers from '../components/Members/ManagerMembers';
import EmployerMembers from '../components/Members/EmployerMembers';

function Tasks() {
  return (
    <>
      <h1>Tasks</h1>
      <AdminTasks />
      <ManagerTasks />
      <EmployerTasks />
      <h1>Members</h1>
      <AdminMembers />
      <ManagerMembers />
      <EmployerMembers />
    </>
  );
}

export default Tasks;