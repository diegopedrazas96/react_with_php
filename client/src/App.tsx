import { useEffect, useState } from 'react';
import SearchComponent from './components/searchComponent';
import { JokeResponse } from './entities/JokesResponse';
import { getJokes } from './service/jokesService';
import { Button } from "@material-tailwind/react";
import LoadingSpinner from './components/loadingComponent';
function App() {
  
  const [jokesData, setJokesData] = useState<JokeResponse | undefined>(undefined);
  const [showButton, setShowButton] = useState<boolean>(true);
  const [disablePrevious, setDisablePrevious] = useState<boolean>(false);
  const [disableNext, setDisableNext] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchJokes("",1);
  }, []);

  function searchJokes(textSearch: string, pageNumber: number) {
    setIsLoading(true);
    getJokes(textSearch,pageNumber).then((result) => {
      setIsLoading(false);
      setJokesData(result.data)
    });
  }

  function handleMessage(msg: string) {
    setShowButton(false);
    searchJokes(msg,1);
  }

  function handleNext(searchTerm : string,page : number) {
    if(jokesData?.total_pages == page){
      setDisableNext(true);
      setDisablePrevious(false);
   }else{
     setDisableNext(false); 
     setDisablePrevious(false);
   }
    setShowButton(false);
    searchJokes(searchTerm,page);
    //searchJokes(msg);
  }
  function handlePreviuos(searchTerm : string,page : number) {
    debugger;
    if(jokesData?.current_page == 2){
      setDisablePrevious(true);
      setDisableNext(false); 
   }else{
      setDisablePrevious(false); 
      setDisableNext(false);
   }
    setShowButton(false);
    searchJokes(searchTerm,page-1);
    //searchJokes(msg);
  }

  return (
    <div className="grid h-screen place-items-center">
      {isLoading ? <div><LoadingSpinner ></LoadingSpinner></div> : 
      <><h1 className="text-6xl font-bold underline">
          Hello Caffeine!
        </h1><div className='py-8'>
            <SearchComponent onSendMessage={handleMessage}></SearchComponent>
          </div><div className='py-2'>
            <ul className="divide-y divide-gray-200">
              {jokesData?.results.map((joke) => (
                <li key={joke.id} className="py-4 flex">
                  <p className="text-sm font-medium text-gray-900">{joke.joke}</p>
                </li>
              ))}
            </ul>
          </div><div data-testid="buttonSection" className='py-2'>
            {(jokesData?.total_jokes ?? 0 > 20) && (showButton === false) ? (
              <div  className="flex w-max gap-4">
                <Button data-testid="previous" disabled={disablePrevious} onClick={() => handlePreviuos(jokesData?.search_term ?? "", jokesData?.current_page ?? 0)}>Previous</Button>
                <Button data-testid="next" disabled={disableNext} onClick={() => handleNext(jokesData?.search_term ?? "", jokesData?.next_page ?? 0)}>Next</Button>
              </div>)
              : null}
          </div></>
      }
    </div>


  );
}

export default App;
