import React, { useState, useEffect } from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      {isLoading ? <Loader /> : <h1>¡Carga completada!</h1>}
    </div>
  );
};

export default App;