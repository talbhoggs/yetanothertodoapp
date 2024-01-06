import {useState} from "react";
import { PropTypes } from "prop-types";
const Components = () => {

    return(
        <>
        <HeaderComponent1 />
        <ContentComponent />
        <FooterComponent />
        </>
    );
};

export default Components;


const HeaderComponent1 = () => {
    return(<nav>HEADER</nav>);
}
const ContentComponent = () => {

    const [count, setCount] = useState(0);

    const incrementParentCount = (by) => {
        setCount(count + by)
    }

    const decrementParentCount = (by) => {
        setCount(count - by)
    }


    return(<main>
        <h1>{count}</h1>
        <CounterButtons decrementParentCount={decrementParentCount} incrementParentCount={incrementParentCount}/>
        <CounterButtons decrementParentCount={decrementParentCount} incrementParentCount={incrementParentCount} by={4}/>
    </main>);
}
/*
const CounterButtons = (props) => {
    const [count, setCount] = useState(0);

    return(<div>
            <div>{count}</div>
            <button type="button" onClick={()=>setCount(count+ props.by)}>incrementCount + {props.by}</button>
            <button type="button" onClick={()=>setCount(count- props.by)}>decrementCount - {props.by}</button>
    </div>);
}
*/



const CounterButtons = (props) => {
    const {by, incrementParentCount, decrementParentCount} = props;
    const [count, setCount] = useState(0);
    return(<div>
            <div>{count}</div>
            <button type="button" onClick={()=>{
                setCount(count+ by);
                incrementParentCount(by);
            }
            }>incrementCount + {by}</button>
            <button type="button" onClick={()=>{
                setCount(count- by);
                decrementParentCount(by);
                }}>decrementCount - {by}</button>
    </div>);
}
// set default value a props
CounterButtons.defaultProps = {
    by: 1,
  };
  CounterButtons.propTypes = {
    by: PropTypes.number,
  };

const FooterComponent = () => {
    return(<footer>Footer</footer>);
}