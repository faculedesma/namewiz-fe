import { useState } from 'react';
import { Formule } from '@assets/svgs/Formule';
import { Refresh } from '@assets/svgs/Refresh';
import { ZodiacSigns } from '@components/filters/ZodiacSigns';
import { Nationality } from '@components/filters/Nationality';
import { LetterStart } from '@components/filters/LetterStart';
import { Gender } from '@components/filters/Gender';
import { Longitude } from '@components/filters/Longitude';
import { AditionalInformation } from '@components/filters/AditionalInformation';
import { PersonalityTraits } from '@components/filters/PersonalityTraits';
import { NatureInspired } from '@components/filters/NatureInspired';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { SecondaryButton } from '@components/buttons/SecondaryButton';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import { Results } from '@components/results/Results';
import { Loader } from '@components/loader/Loader';
import { toast } from 'sonner';
import './content.scss';

function isEmpty(value: string | Array<string>) {
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (value === '') {
    return true;
  }
  return false;
}

const Content = () => {
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [names, setNames] = useState<[]>([]);

  const { filters, clearFilters } = useFiltersContext();

  const validateFilters = () => {
    return !Object.values(filters).every((val) => {
      return isEmpty(val);
    });
  };

  const fetchNames = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://wisian.onrender.com/ask',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filters)
        }
      );

      const data = await response.json();
      setNames(data);
      const results =
        document.getElementById('results-box');
      results?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      toast.error(
        'There was an error getting the name. Please try again.'
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetName = async () => {
    const isValid = validateFilters();
    if (!isValid) {
      toast.error('You must select at least one filter.');
      return;
    }
    await fetchNames();
  };

  const handleCleanData = () => {
    clearFilters();
    setNames([]);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="content-left">
          <div className="content-left--filters">
            <div className="content-left--filters-first">
              <ZodiacSigns />
            </div>
            <div className="content-left--filters-second">
              <Nationality />
              <div className="content-left--filters-second-shorts">
                <Gender />
                <Longitude />
                <LetterStart />
              </div>
            </div>
            <div className="content-left--filters-third">
              <PersonalityTraits />
              <NatureInspired />
            </div>
            <div className="content-left--filters-four">
              <AditionalInformation />
            </div>
            <div className="content-left--filters-cta">
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
              <SecondaryButton
                label={<Refresh />}
                onClick={handleCleanData}
              />
            </div>
          </div>
        </div>
        <div className="content-right">
          <Results names={names} />
        </div>
        <div className="content-bg">
          <Formule />
        </div>
      </div>
    </div>
  );
};

export default Content;
