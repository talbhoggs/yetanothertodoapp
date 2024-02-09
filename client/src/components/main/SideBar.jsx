export default function SideBar() {
   return (
      <div className="content-details show-content-details">
         <section className="details">
            <div className="add-details">
               <div className="add-todo">
                  <span>
                     <input className="checkbox-round" type="checkbox" />
                  </span>
                  <input type="text" />
               </div>
               <input type="date" />
               <div>
                  <input type="button" value="Save" />
               </div>
            </div>
            <div className="details-footer">
               <span>hide</span>
               <span>delete</span>
            </div>
         </section>
      </div>
   );
}
