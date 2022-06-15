import React from 'react';
import './Form.css';

export default function Form(props) {
  const [userData, setUserData] = React.useState({
    surname: '',
    name: '',
    age: 12,
    dob: '',
    termsOfAgrement: false,
    email: '',
    password: '',
    confirmPassword: '',
    loveCats: '',
    favColor: '',
    timeToBed: '',
    favCarBrands: '',
    rating: 0,
    comments: '',
    recommend: 'Yes',
  });

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [name]: inputValue,
      };
    });
  }

  const [isShown, setIsShown] = React.useState({
    information: true,
    registration: true,
    facts: true,
    additionalInfo: true,
  });

  function handleClickLegend(fieldSetID) {
    setIsShown((prevIsShown) => {
      return {
        ...prevIsShown,
        [fieldSetID]: !prevIsShown[fieldSetID],
      };
    });
  }

  const fieldClassCSS = props.darkMode ? 'field dark' : 'field';

  return (
    <div>
      <form
        className={props.darkMode ? 'form dark' : 'form'}
        action="/test"
        method="post"
        autoComplete="off"
      >
        <fieldset className="form--fieldset">
          <legend
            className="fieldset--legend"
            onClick={() => handleClickLegend('information')}
          >
            Personal information
          </legend>
          {isShown.information && (
            <>
              <div className={fieldClassCSS}>
                <label htmlFor="surname">Surname:</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={userData.surname}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="age">How old are You?</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="dob">Full date of birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="termsOfAgrement">
                  I accept the term of the agrement
                </label>
                <input
                  type="checkbox"
                  id="termsOfAgrement"
                  name="termsOfAgrement"
                  value={userData.termsOfAgrement}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </fieldset>

        <fieldset className="form--fieldset">
          <legend
            className="fieldset--legend"
            onClick={() => handleClickLegend('registration')}
          >
            Registration
          </legend>

          {isShown.registration && (
            <>
              <div className={fieldClassCSS}>
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </fieldset>

        <fieldset className="form--fieldset">
          <legend
            className="fieldset--legend"
            onClick={() => handleClickLegend('facts')}
          >
            An intresting fact about you!
          </legend>

          {isShown.facts && (
            <>
              <div className={fieldClassCSS}>
                <label htmlFor="loveCats">
                  Do you love cats?
                  <label htmlFor="loveCatsYes">
                    <input
                      type="radio"
                      id="loveCatsYes"
                      name="loveCats"
                      value="Yes"
                      checked={userData.loveCats === 'Yes'}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label htmlFor="loveCatsNo">
                    <input
                      type="radio"
                      id="loveCatsNo"
                      name="loveCats"
                      value="No"
                      checked={userData.loveCats === 'No'}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </label>
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="favColor">What is your favorite color?</label>
                <input
                  type="color"
                  id="favColor"
                  name="favColor"
                  value={userData.favColor}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="timeToBed">What time do you go to bed?</label>
                <input
                  type="time"
                  id="timeToBed"
                  name="timeToBed"
                  value={userData.timeToBed}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="favCarBrands">
                  What are your favorite brand of cars?
                </label>
                <select
                  // In React we can't use multiple selection option. For this we need to install package [npm i --save react-select ] then [import Select from 'react-select']
                  id="favCarBrands"
                  name="favCarBrands"
                  value={userData.favCarBrands}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="BMW">BMW</option>
                  <option value="Audi">Audi</option>
                  <option value="Ladia">Ladia</option>
                </select>
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="rating">How do you rate our work?</label>
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  value={userData.rating}
                  onChange={handleChange}
                  min={0}
                  max={10}
                />
              </div>
            </>
          )}
        </fieldset>

        <fieldset className="form--fieldset">
          <legend
            className="fieldset--legend"
            onClick={() => handleClickLegend('additionalInfo')}
          >
            Additionl Info
          </legend>
          {isShown.additionalInfo && (
            <>
              <div className={fieldClassCSS}>
                <label htmlFor="comments">Comments</label>
                <textarea
                  name="comments"
                  id="comments"
                  cols="80"
                  rows="4"
                  value={userData.comments}
                  onChange={handleChange}
                />
              </div>

              <div className={fieldClassCSS}>
                <label htmlFor="recommend">Would you recommend us?</label>
                <select
                  id="recommend"
                  name="recommend"
                  value={userData.recommend}
                  onChange={handleChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </>
          )}
        </fieldset>

        <input
          type="submit"
          onClick={() => {
            document.preventDefault();
          }}
        />
      </form>
    </div>
  );
}
