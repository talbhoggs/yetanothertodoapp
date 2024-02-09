import profileLogo from '../../assets/profile.jpg';
export default function Header() {
   return (
      <header>
         <nav>
            <h2>YetAnotherTodo</h2>
            <form className="search">
               <input type="text" placeholder="Search" />{' '}
            </form>
            <div className="user-details">
               <span>Welcome Charles</span>
               <img src={profileLogo} width="45" height="45" />
            </div>
         </nav>
      </header>
   );
}
