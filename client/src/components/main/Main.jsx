import AddTodo from './AddTodo';
import ContentHeader from './ContentHeader';
import SideBar from './SideBar';
import Todos from './Todos';
export default function Main() {
   return (
      <main>
         <section className="content min-content">
            <ContentHeader />
            <AddTodo />
            <Todos />
         </section>
         <SideBar />
      </main>
   );
}
