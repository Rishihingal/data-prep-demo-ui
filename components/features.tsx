export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Volunteers Suitability Score Workflow</h2>
            <p className="text-xl text-gray-400">The detailed volunteers suitability score workflow as discussed</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <path className="stroke-current text-purple-100" d="M32 20v20M31 20l-6 6M32 20l6 6" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd" />
                <path className="stroke-current text-purple-300" d="M20 42h24v-4H20z" strokeLinecap="square" strokeWidth="2" />
              </svg>
              <h4 className="h4 mb-2">Uploading the Data</h4>
              <p className="text-lg text-gray-400 text-center">Users will be able to upload their datasets. Supported formats: CSV, Excel, JSON.The system will validate the uploaded file to ensure it meets the required format and structure.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <rect x="18" y="34" width="6" height="14" className="fill-current text-purple-100" />
                <rect x="28" y="26" width="6" height="22" className="fill-current text-purple-200" />
                <rect x="38" y="20" width="6" height="28" className="fill-current text-purple-300" />
                <circle cx="45" cy="45" r="6" className="stroke-current text-purple-200" strokeWidth="2" fill="none" />
                <line x1="49" y1="49" x2="54" y2="54" className="stroke-current text-purple-200" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h4 className="h4 mb-2">Exploratory Data Analysis</h4>
              <p className="text-lg text-gray-400 text-center">Key functionalities of EDA : Summary Statistics, Data Visualization, Missing Values Analysis, Data Distribution.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                {/* <!-- Graph --> */}
                <polyline points="16,44 24,32 36,40 48,20" className="stroke-current text-purple-100" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="48" cy="20" r="3" className="fill-current text-purple-100" />
                <circle cx="36" cy="40" r="3" className="fill-current text-purple-100" />
                <circle cx="24" cy="32" r="3" className="fill-current text-purple-100" />
                <circle cx="16" cy="44" r="3" className="fill-current text-purple-100" />
                {/* <!-- Gear --> */}

              </svg>
              <h4 className="h4 mb-2">Model Selection & Training</h4>
              <p className="text-lg text-gray-400 text-center">Users can select from a predefined set of machine learning models for training. Supported models: Logistic Regression, Decision Trees, Random Forest, Support Vector Machines, etc.</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <g transform="translate(22 21)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <path className="stroke-current text-purple-100" d="M17 22v-6.3a8.97 8.97 0 003-6.569A9.1 9.1 0 0011.262 0 9 9 0 002 9v1l-2 5 2 1v4a2 2 0 002 2h4a5 5 0 005-5v-5" />
                  <circle className="stroke-current text-purple-300" cx="13" cy="9" r="3" />
                </g>
              </svg>
              <h4 className="h4 mb-2">Prediction of New Data</h4>
              <p className="text-lg text-gray-400 text-center">After training, users can upload new data to make predictions using the trained model. Key functionalities are Data Upload for Prediction, Generate Predictions, Prediction Output.</p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-blocks]">
            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
    {/* <!-- Gears --> */}
    <circle cx="24" cy="24" r="6" className="stroke-current text-purple-100" strokeWidth="2" fill="none" />
    
    <circle cx="40" cy="40" r="6" className="stroke-current text-purple-100" strokeWidth="2" fill="none" />
  </svg>
              <h4 className="h4 mb-2">Model Management</h4>
              <p className="text-lg text-gray-400 text-center">Users can save the trained model as a pickle file for future use Key functionalities are Save Model, Load Model, Model Management.</p>
            </div>

            {/* 6th item */}

          </div>

        </div>
      </div>
    </section>
  )
}
