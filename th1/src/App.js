import './App.css';
import react, {useState} from 'react';
function App() {
  const [ values, setValues ] = useState({
    email: '',password:'',confirmPassword:'',isRead:false,
  });
  const [errors, setErrors ] = useState([]);

  const handleChange = (e) => {
    e.persist();
    if (e.target.name === 'isRead') {
      setValues({...values, [e.target.name]: !values.isRead,});
    }
    else{ 
      setValues({...values, [e.target.name]: e.target.value,});
    }
    };
    
    const stringJson =JSON.stringify(values);

    function validate(){
      const { email,password,confirmPassword,isRead } = values;
      const errors = [];
      if (email.length < 5) {
        errors.push("Email should be at least 5 characters long");
      }
      if (email.split("").filter((x) => x === "@").length !== 1) {
        errors.push("Email should contain a @");
      }
      if (email.indexOf(".") === -1) {
        errors.push("Email should contain at least one dot");
      }
      if (password.length < 6) {
        errors.push("Password should be at least 6 characters long");
      }
      if (password !== confirmPassword) {
        errors.push("Password should be at least 6 characters long");
      }
      if (!isRead) {
        errors.push("You must be accepted privacy policy");
      }
      return errors;
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const errors = validate();
      if (errors.length > 0) {
        setErrors(errors);
        return;
      }
    };
    
  return (
    <div className="container">
    {errors.map((error) => (
      <p key={error}>Error: {error}</p>
    ))}
      <h1> Đăng kí</h1>
      <form onSubmit={handleSubmit}>
      <p>Nhập email</p>
      <input type="text" name="email" value={values.email} onChange={handleChange}/>
      <p>nhập password:</p>
      <input
        name="password"
        type="password"
        defaultValue={values.password}
        onChange={handleChange}
      />
      <p>nhập lại password:</p>
      <input
        name="confirmPassword"
        type="password"
        defaultValue={values.confirmPassword}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>
        <input
          name="isRead"
          type="checkbox"
          checked={values.isRead}
          onChange={handleChange} />I read and accept the privacy policy:
      </label>

      <p>bấm submit form</p>
      <button>submit nè</button>
      </form>
      <div className="show-json-string-setValues">{stringJson}</div>
      </div>
  );
}

export default App;
