import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { ArrowRight } from '@assets/svgs/ArrowRight';
import { Formule } from '@assets/svgs/Formule';
import { ZodiacSigns } from '@components/filters/ZodiacSigns';
import { Nationality } from '@components/filters/Nationality';
import { LetterStart } from '@components/filters/LetterStart';
import { Gender } from '@components/filters/Gender';
import { Longitude } from '@components/filters/Longitude';
import { AditionalInformation } from '@components/filters/AditionalInformation';
import { PersonalityTraits } from '@components/filters/PersonalityTraits';
import { NatureInspired } from '@components/filters/NatureInspired';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import { Results } from '@components/results/Results';
import { Loader } from '@components/loader/Loader';
import './content.scss';

const Content = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] =
    useState<boolean>(true);
  const [isFiltersValid, setIsFiltersValid] =
    useState<boolean>(true);
  const [showResults, setShowResults] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const { filters } = useFiltersContext();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(
      emailRegex.test(inputEmail) ||
        !Boolean(inputEmail.length)
    );
  };

  const handleSubscribeNewsletter = (
    e: FormEvent<HTMLFormElement>
  ) => console.log(e);

  const handleGetName = () => {
    // at least one validation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
    console.log(filters);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="content-left">
          <h1>
            Let's find the <b>perfect</b> name for your
            little one
          </h1>
          <h2>
            Our algorithms take into account a wide range of
            criteria, including zodiac signs, origin,
            meaning, and popularity.
          </h2>
          <div className="content-left--input">
            <label>Subscribe to newsletter</label>
            <form onSubmit={handleSubscribeNewsletter}>
              <div className="content-left--input-box">
                <input
                  type="text"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <ArrowRight />
              </div>
              {!isEmailValid ? (
                <p className="content-left--input-error">
                  Please enter a valid email address
                </p>
              ) : (
                <p></p>
              )}
            </form>
          </div>
        </div>
        <div className="content-right">
          {showResults ? (
            <Results onGoAgain={setShowResults} />
          ) : (
            <div className="content-right--filters">
              <div className="content-right--filters-first">
                <ZodiacSigns />
              </div>
              <div className="content-right--filters-second">
                <Nationality />
                <div className="content-right--filters-second-shorts">
                  <Gender />
                  <Longitude />
                  <LetterStart />
                </div>
              </div>
              <div className="content-right--filters-third">
                <PersonalityTraits />
                <NatureInspired />
              </div>
              <div className="content-right--filters-four">
                <AditionalInformation />
              </div>
              <div className="content-right--filters-cta">
                <PrimaryButton
                  label={
                    isLoading ? (
                      <Loader width={20} height={20} />
                    ) : (
                      'Get names'
                    )
                  }
                  onClick={handleGetName}
                />
                {!isFiltersValid ? (
                  <p>
                    At least one filter must be selected
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>
        <div className="content-bg">
          <Formule />
        </div>
      </div>
    </div>
  );
};

export default Content;
