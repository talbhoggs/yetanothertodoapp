import {useState} from 'react';
import dayjs from 'dayjs';
export default function ContentHeader() {
   const date = new Date();
   const day = dayjs(date).format('dddd,  MMM d');
   return (
      <div className="content-header">
         <div>
            <h3>My Day:</h3>
            <span>{day}</span>
         </div>
         <span> Sort </span>
      </div>
   );
}
