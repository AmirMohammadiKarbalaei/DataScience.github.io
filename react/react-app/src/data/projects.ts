export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  animation?: string;
  tags: string[];
  category: string[];
  githubUrl?: string;
  streamlitUrl?: string;
  content: {
    data?: string;
  process?: string[];
  processSections?: { [section: string]: string | string[] };
    keyFindings?: string[];
    findings?: { [section: string]: string[] };
    limitations?: string[];
    images?: { src: string; caption: string }[];
  };
}

export const projects: Project[] = [
  {
    id: 'diabetes-classification',
    title: 'Diabetes Classification',
    description: 'Classify diabetes patient\'s health status based on their current health metrics.',
    image: '/media/diabetes/EDA.png',
    animation: '/media/animation/diabetes.json',
    tags: ['ML', 'Classification', 'EDA'],
    category: ['AI', 'TimeSeries'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/Pima-Indians-Diabetes',
    streamlitUrl: 'https://pima-indians-diabetes-k6mzyppban6rqolb5mtrdc.streamlit.app/?embed=true&embed_options=dark_theme',
    content: {
      data: 'The datasets consist of several medical predictor (independent) variables and one target (dependent) variable, Outcome. Independent variables include the number of pregnancies the patient has had, their BMI, insulin level, age, and so on.',
      process: [
        'Exploratory Data Analysis (EDA): Performed comprehensive data cleansing and exploratory analysis. Each feature was inspected to determine acceptable ranges, distributions and missing value treatment; visualisations were used to highlight skew, outliers and correlations.',
        'Feature Engineering: Created interaction features (for example Age x Insulin) and transformed skewed variables. Feature importance and contribution were evaluated using SHAP (Shapley Additive Explanations) to identify the most influential predictors.',
        'SMOTE (Synthetic Minority Oversampling Technique): Applied SMOTE to augment the minority class and mitigate class imbalance, improving model generalisation relative to naive oversampling.',
        'Model Implementation: Implemented and compared multiple machine learning models (Random Forest, XGBoost, and a shallow neural network). Random Forest achieved the best performance (≈93% accuracy). A sequential neural network was also trained — its accuracy and loss curves are provided for train/validation/test comparisons and showed comparable performance to Random Forest in this task.',
        'Model Interpretation (SHAP): SHAP summary plots indicate that low Insulin values and interactions between Age and Insulin are among the strongest drivers of model predictions. Features such as Blood Pressure and number of pregnancies had relatively low impact and were candidates for removal to reduce model complexity.',
        'Deployment: Following a comparative evaluation, the random forest (RF) model has been selected for deployment due to its performance similarity to the deep learning model. This decision is underpinned by the RF models interpretability and its lightweight, scalable characteristics, making it a pragmatic choice over deep learning models which demand significant computational resources. To streamline the models usability for prediction, a Streamlit application has been developed. This application seamlessly processes input data in the form of a pandas dataframe resembling the training dataset, conducting necessary preprocessing and feature engineering to enable predictions.'
      ],
      processSections: {
        'Exploratory Data Analysis (EDA)': 'After comprehensive data cleansing, the dataset has undergone thorough exploratory analysis. Each feature has been carefully examined to determine acceptable ranges and ensure data integrity. Visualisations (histograms, boxplots, correlations) were used to surface skewness, outliers and relationships between features.',
        'Feature Engineering': 'To enhance model performance, new features such as interactions between Age and Insulin were created. Skewed variables were transformed and missing values addressed. SHAP (Shapley Additive Explanations) was used to evaluate feature importance and guide feature selection.',
        'Synthetic Minority Oversampling Technique (SMOTE)': 'SMOTE was applied to the training data to synthetically up-sample the minority class, improving balance and reducing model bias towards the majority class. This helped models better identify positive diabetes cases without overfitting to duplicates.',
        'Model Implementation': [
          'Multiple ML models implemented: Random Forest, XGBoost and a sequential neural network.',
          'Random Forest achieved highest accuracy (~93%) on validation/test holdouts.',
          'SHAP summary plots show low Insulin and Age x Insulin interactions are strong predictors; Blood Pressure and pregnancies were less influential.',
          'The neural network produced similar performance but required more compute and tuning; accuracy/loss curves for train/validation/test are available in the project images.'
        ],
        'Deployment': 'Random Forest was selected for deployment due to interpretability and lower computational cost. A Streamlit app was created that accepts a pandas DataFrame, runs identical preprocessing/feature engineering steps and returns predictions via a simple web UI.'
      },
      images: [
        { src: '/media/diabetes/Data-Table.png', caption: 'Dataset Overview' },
        { src: '/media/diabetes/EDA.png', caption: 'Feature distributions' },
        { src: '/media/diabetes/Feature-Corr.png', caption: 'Feature Correlation' },
        { src: '/media/diabetes/Feature-importance.png', caption: 'Random Forest feature importance' },
        { src: '/media/diabetes/NNloss.png', caption: 'NN Model Loss (train/val/test)' },
        { src: '/media/diabetes/NNacc.png', caption: 'NN Model Accuracy (train/val/test)' }
      ]
    }
  },
  {
    id: 'business-analysis',
    title: 'Business Analysis',
    description: 'Analysing orders dataset from a business comprising of over 3000 data points spanning from 2011 to 2016.',
    image: '/media/Business analysis/Overview.png',
    animation: '/media/animation/customer.json',
    tags: ['BI', 'DA', 'Dashboard'],
    category: ['AI', 'ML'],
    content: {
      data: 'The dataset spans from 2011 to 2016 and encompasses business trading activities across three countries and 31 states. With over 3000 data points encompassing information such as customer age and gender, product details, product categories, dates, and more.',
      findings: {
        Overview: [
          'France constitutes the majority of the orders, comprising 88% of total orders, while other countries contribute approximately 6%.',
          'Customer demographics reveal an even distribution of gender, with a significant presence of young adults and adults, suggesting a need for targeted marketing strategies.',
          'Order volumes have shown a progressive increase over time, with clear seasonality observed, potentially influenced by external factors.'
        ],
        Profit: [
          'The business has generated a total profit of 904k pounds, with an average profit per product sold of 193 pounds.',
          'Some products, such as AWC Logo caps and certain jerseys, yield negative profits, warranting further investigation into underlying causes.',
          'Mountain bikes emerge as the highest profit-generating products, with road bikes following closely behind.'
        ],
        Orders: [
          'A progressive increase in orders can be seen, expecting nearly 2000 orders annually by 2020.',
          'Accessories, particularly patch kits, dominate product lineup, notably in 2014 and 2016.',
          'Normal age distribution with female customers slightly younger; average customer age increasing suggests marketing focus shift.'
        ]
      },
      process: [
        'Load and clean the orders dataset and harmonise country/state labels.',
        'Aggregate transactions by country, year and product categories to compute revenue and profit metrics.',
        'Visualise orders over time to identify seasonality and growth trends.',
        'Analyse product-level profitability to highlight loss-making SKUs for further investigation.'
      ],
      limitations: [
        'Lack of customer-related information prevents deeper analysis such as retention rates and lifetime value.',
        'Some product metadata is inconsistent across years which required manual harmonisation.',
        'Geographic granularity is limited for some deliveries, restricting fine-grained regional analysis.'
      ],
      images: [
        { src: '/media/Business analysis/Overview.png', caption: 'Overview' },
        { src: '/media/Business analysis/Orders.png', caption: 'Orders' },
        { src: '/media/Business analysis/Profit.png', caption: 'Profit' }
      ]
    }
  },
  {
    id: 'beat',
    title: 'BEAT - Attendance Tracking System',
    description: 'Creating a secure and scalable attendance tracking system for Bath Enterprise.',
    image: '/media/BEAT/bathenterprise.png',
    tags: ['Power BI', 'AWS', 'Software Dev', 'Shell-Scripting'],
    category: ['ML', 'BI', 'DA'],
    content: {
      data: 'Enterprise Bath is a University of Bath department which offers advice, business mentors, competitions, masterclasses, expert talks, placements and networking opportunities to aspiring entrepreneurs and intrapreneurs through an extra-curricular programme of events. This project aimed to create a secure and scalable attendance tracking system to enhance engagement and data accessibility for the entrepreneurial community.',
      processSections: {
        Concept: 'The project objective was to create a secure and scalable attendance tracking system tailored for Enterprise Bath to improve event management and participant engagement.',
        'Technologies & Features': [
          'A GDPR-compliant PostgreSQL database for secure and efficient attendance data management.',
          'Automated data collection using LDAP queries and RFID card readers for accurate tracking.',
          'A responsive Power BI dashboard for real-time attendance analysis and reporting.',
          'Cloud-based technology for scalability and seamless integration.',
          'Comprehensive documentation for ease of maintenance and long-term usability.'
        ],
        Process: [
          'Designing and implementing a PostgreSQL database optimised for performance and data protection.',
          'Setting up secure, automated data collection pipelines using LDAP and RFID technologies.',
          'Creating intuitive Power BI visualisations tailored to the needs of stakeholders.'
        ],
        Outcome: 'The system successfully streamlined attendance tracking, providing insightful analytics and ensuring data security. It was well-received by the entrepreneurial community for its usability and efficiency.'
      },
      keyFindings: [
        'Successfully streamlined attendance tracking with automated data collection',
        'Achieved GDPR compliance for secure data management',
        'Integrated LDAP queries and RFID card readers for accurate tracking',
        'Provided real-time attendance analysis through Power BI dashboard',
        'Enhanced engagement and data accessibility for entrepreneurial community',
        'Implemented cloud-based technology for scalability and seamless integration'
      ],
      images: [
        { src: '/media/BEAT/bathenterprise.png', caption: 'Bath Enterprise Logo' },
        { src: '/media/BEAT/Analysis.png', caption: 'Analysis Dashboard' },
        { src: '/media/BEAT/Overview.png', caption: 'System Overview' }
      ]
    }
  },
  {
    id: 'detect-sleep-states',
    title: 'Detect Sleep States - Child Mind Institute',
    description: 'Detect sleep onset and wake from wrist-worn accelerometer data to determine a person\'s sleep state.',
    image: '/media/Detect-Sleep-States-CMI/data_dis.png',
    animation: '/media/animation/cmi2.json',
    tags: ['ML', 'Classification', 'Time-Series', 'EDA'],
    category: ['TimeSeries', 'AI'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/Detect-Sleep-States-CMI',
    content: {
      data: 'The "Zzzs" you catch each night are crucial for your overall health. Sleep affects everything from your development to cognitive functioning. This project aims to help researchers better analyse wrist-worn accelerometer data for sleep monitoring, enabling large-scale studies to improve understanding of sleep\'s importance and function. The dataset comprises about 500 multi-day recordings of wrist-worn accelerometer data annotated with sleep onset and wakeup events. Annotation guidelines used for the dataset include: a sleep period must be at least 30 minutes long; interruptions shorter than 30 consecutive minutes are allowed within a sleep window; the longest single sleep window in a night is recorded; no events are recorded for periods when the device is not worn; and there is at most one recorded sleep window per night.',
      process: [
        'Exploratory Data Analysis (EDA): Thorough dataset cleaning and selection of continuous data series for model training',
        'Feature Engineering: Incorporated lag features for Enmo and Angle-Z to introduce temporal elements',
        'Additional features: Added "Hour of day," "Day of Month," and other temporal features to the dataset',
        'Feature importance assessment using SHAP (Shapley Additive explanations) analysis',
        'Model Implementation: Compared Random Forest and HistGradientBoostingClassifier algorithms',
        'Model evaluation and performance optimization achieving approximately 75% accuracy'
      ],
      keyFindings: [
        'Random Forest outperformed HistGradientBoostingClassifier with ~75% accuracy',
        'Lag features for Enmo and Angle-Z significantly improved temporal pattern recognition',
        'SHAP analysis revealed key feature importance in sleep state detection',
        'Temporal features like hour of day and day of month contributed to model performance',
        'Sleep periods must be at least 30 minutes long with interruptions not exceeding 30 minutes',
        'Successfully identified sleep onset and wakeup events from continuous accelerometer data',
        'Model effectively handled multi-day recordings for realistic sleep pattern analysis'
      ],
      limitations: [
        'Model accuracy limited to ~75%, indicating room for improvement',
        'Dataset restricted to wrist-worn accelerometer data only',
        'Sleep annotation depends on longest single period of inactivity definition',
        'No predictions made during device removal periods to avoid false positives',
        'Model requires continuous data series without gaps for optimal performance'
      ],
      images: [
        { src: '/media/Detect-Sleep-States-CMI/data_clusters.png', caption: 'Cluster Map of Series Data' },
        { src: '/media/Detect-Sleep-States-CMI/data_dis.png', caption: 'Enmo and Angle-Z Distributions' },
        { src: '/media/Detect-Sleep-States-CMI/class_distributions.png', caption: 'Class Distributions for Data Split' },
        { src: '/media/Detect-Sleep-States-CMI/Classification report.jpg', caption: 'Classification Report' },
        { src: '/media/Detect-Sleep-States-CMI/Confusion matrix.png', caption: 'Confusion Matrix' },
        { src: '/media/Detect-Sleep-States-CMI/ROC curve.png', caption: 'ROC Curve Analysis' },
        { src: '/media/Detect-Sleep-States-CMI/feature_data.jpg', caption: 'Feature Data Analysis' },
        { src: '/media/Detect-Sleep-States-CMI/shap.png', caption: 'SHAP Feature Importance Analysis' }
      ]
    }
  },
  {
    id: 'fraud-detection',
    title: 'Fraud Detection',
    description: 'Detect fraudulent transactions in financial data using machine learning algorithms.',
    image: '/media/FraudDetection/ConfusionMatrix.png',
    animation: '/media/animation/fraud_animation.json',
    tags: ['ML', 'Classification'],
    category: ['AI'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/FraudDetection',
    content: {
      data: 'The FraudDetection System is a Python-based solution designed to identify and mitigate fraudulent transactions within financial datasets. By leveraging state-of-the-art machine learning algorithms and comprehensive data preprocessing techniques, this system ensures the accurate detection of fraudulent activities.',
        process: [
          'Data Preprocessing: Robust data preprocessing including missing value handling, categorical encoding and numeric normalisation.',
          'Model Training & Comparison: Trained and compared Random Forest and a deep learning model (FraudDetectionModel).',
          'Evaluation & Persistence: Evaluated models using precision/recall/F1 and implemented model persistence for reuse in production.'
        ],
        processSections: {
          'Overview': 'Python-based fraud detection system that combines feature engineering, classical ML and deep learning to identify suspicious transactions in financial datasets.',
          'Key Features': [
            'Comprehensive data preprocessing pipeline (missing values, encoding, normalisation)',
            'Multiple model support (Random Forest, deep learning model) for comparative evaluation',
            'Model persistence for saving/loading trained artefacts to support deployment'
          ],
          'System Requirements': [
            'Python',
            'Pandas for data manipulation',
            'Numpy for numerical computations',
            'Torch for deep learning (optional)',
            'Scikit-Learn for classical ML',
            'Matplotlib / Seaborn for visualisation'
          ],
          'Usage Instructions': [
            'Place dataset (e.g. Fraud.csv) in the Fraud_data directory and run the DataPreprocessing module to prepare features',
            'Train models using the provided training scripts (supports deep learning and Random Forest workflows)',
            'Evaluate models with provided evaluation scripts and save the best performing model using the ModelSaving utilities'
          ],
          'Example Use Cases': [
            'Detect fraudulent transactions in a financial pipeline to reduce chargebacks and losses',
            'Use system as a benchmarking tool to compare modelling approaches and feature engineering strategies'
          ]
        },
        keyFindings: [
          'Multiple modelling approaches improve robustness to different fraud patterns',
          'Careful preprocessing and class imbalance handling are critical for performance',
          'Model persistence enables simple deployment and integration into downstream systems'
        ],
      images: [
        { src: '/media/FraudDetection/modeleval.png', caption: 'Model Evaluation' },
        { src: '/media/FraudDetection/ROC-AUC.png', caption: 'ROC-AUC' },
        { src: '/media/FraudDetection/ConfusionMatrix.png', caption: 'Confusion Matrix' }
      ]
    }
  },
  {
    id: 'daily-link-ai',
    title: 'DailyLinkAI',
    description: 'Your Personalised Daily News Recommender.',
    image: '/media/DailyLinkAI/app_screenshot.png',
    animation: '/media/animation/news.json',
    tags: ['NLP', 'ML', 'RAG'],
    category: ['NLP', 'AI'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/DailyLinkai',
    streamlitUrl: 'https://dailylinkai.streamlit.app',
    content: {
        data: 'DailyLinkAI curates a personalised daily news feed by analysing article content from reputable sources such as BBC and SkyNews. The application uses NLP embeddings and retrieval techniques to recommend contextually relevant articles based on user interests.',
        processSections: {
          'Article Collection': 'Articles are scraped from trusted sources (sitemaps/RSS) and stored with metadata to ensure comprehensive coverage.',
          'Content Analysis & Embeddings': 'Text is cleaned and converted to embeddings (BERT-based) so that semantic similarity can be computed across articles.',
          'Retrieval-Augmented Recommendation (RAG)': 'Nearest-neighbour retrieval on embeddings is used to surface semantically-close articles which are then presented in a personalised digest.',
          'Deployment': 'Streamlit application provides an intuitive front-end and a lightweight backend designed for scalability and fast responses.'
        },
        images: [
          { src: '/media/DailyLinkAI/app_screenshot.png', caption: 'Streamlit App' }
        ],
        
    }
  },
  {
    id: 'reinforcement-learning',
    title: 'OpenAI Gym - Reinforcement Learning',
    description: 'Training a gaming agent for optimal performance in OpenAI Gym environments.',
    image: '/media/reinforcement learning/CartPole v1.png',
    animation: '/media/animation/RL.json',
    tags: ['Reinforcement-Learning', 'ML'],
    category: ['RL', 'AI'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/Reinforcement-Learning',
    content: {
      data: 'OpenAI Gym is a toolkit for developing and comparing reinforcement learning algorithms. It offers a standardised platform with predefined environments, such as games and simulations, where agents learn to make decisions by interacting with the environment. The agent receives feedback in the form of observations and rewards, aiming to maximise cumulative rewards over time.',
      processSections: {
        'Training Loop (Q-Learning)': [
          'Initialize Q-table and define state-action space.',
          'Choose actions with an epsilon-greedy policy to balance exploration and exploitation.',
          'Observe reward and update Q-table using the Bellman equation.',
          'Decay exploration over episodes and evaluate performance on test episodes.'
        ],
        'Evaluation & Tuning': 'Track cumulative rewards, tune learning rate and discount factor, and compare performance across environments (CartPole, Acrobot, LunarLander).'
      },
      keyFindings: [
        'Successfully implemented Q-Learning algorithm across multiple OpenAI Gym environments',
        'Agent learned optimal policies for CartPole v1, Acrobot v1, and LunarLander v2 environments',
        'Q-Learning effectively balanced exploration and exploitation strategies',
        'Learning rate significantly influenced magnitude of Q-table updates',
        'Agent performance improved dramatically from random actions to exploiting learned Q-values',
        'Different environments required varying training strategies and hyperparameter tuning',
        'Demonstrated successful transfer of reinforcement learning principles across diverse gaming scenarios'
      ],
      images: [
        { src: '/media/reinforcement learning/CartPole v1.png', caption: 'Model Performance in CartPole v1 Environment' },
        { src: '/media/reinforcement learning/Acrobot v1.png', caption: 'Model Performance in Acrobot v1 Environment' },
        { src: '/media/reinforcement learning/LunarLander v2.png', caption: 'Model Performance in LunarLander v2 Environment' }
      ]
    }
  },
  {
    id: 'disaster-tweets',
    title: 'Disaster Tweets',
    description: 'Predict which Tweets are about real disasters and which ones are not.',
    image: '/media/disaster_tweets/disaster.png',
    animation: '/media/animation/nlp.json',
    tags: ['NLP', 'ML'],
    category: ['NLP', 'AI'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/kaggle-NLP-Disaster-Tweets',
    content: {
      data: 'The ubiquitousness of smartphones enables people to announce an emergency they\'re observing in real-time. Because of this, more agencies are interested in programatically monitoring Twitter (i.e. disaster relief organisations and news agencies). But, it\'s not always clear whether a person\'s words are actually announcing a disaster. The aim of this project is to build a machine learning model that predicts which Tweets are about real disasters and which ones aren\'t.',
      processSections: {
        'Data Understanding': 'Each sample contains tweet text, an optional keyword and an optional location. The dataset was inspected for missing values and distribution of classes.',
        'Data Cleaning & Preparation': 'Removed punctuation, lower-cased text, removed non-English tokens, and vectorized text using TF-IDF. Split into train/test sets with stratification.',
        'Modeling': [
          'Implemented Naive Bayes and baseline models for quick iteration.',
          'Evaluated using accuracy and F1; Naive Bayes produced ~78% test accuracy on the cleaned dataset.'
        ]
      },
      images: [
        { src: '/media/disaster_tweets/Model Eval.jpg', caption: 'XGBoost evaluation' },
        { src: '/media/disaster_tweets/not a disaster.png', caption: 'Document-Term Matrix for not a disaster' },
        { src: '/media/disaster_tweets/disaster.png', caption: 'Document-Term Matrix for a disaster' }
      ]
    }
  },
  {
    id: 'business-data-analytics',
    title: 'Business Data Analytics',
    description: 'Examining customer data from a Brazilian e-commerce store, to uncover valuable insights.',
    image: '/media/Olist/Olist Delivery.jpg',
    animation: '/media/animation/shop.json',
    tags: ['BI', 'Dashboard', 'DA'],
    category: ['DA', 'BI', 'Power BI'],
    content: {
      data: 'Comprehensive analysis of customer data from a Brazilian e-commerce platform, providing insights into customer behavior, sales patterns, and business performance.',
      processSections: {
        'Data Integration': 'Joined orders, customers, sellers, deliveries and reviews tables to form an analytical dataset.',
        'Metrics & KPIs': 'Engineered delivery delay, review sentiment, and seller performance metrics to power dashboards.',
        'Dashboarding': 'Built Power BI reports visualising delivery performance, reviews and customer metrics.'
      },
      findings: {
        'Delivery': ['Delays concentrated in specific regions and sellers; targeted interventions reduced delays.'],
        'Reviews': ['On-time deliveries correlate with higher review scores and repeat purchases.']
      }
      ,
      images: [
        { src: '/media/Olist/Data Schema.png', caption: 'Database Schema' },
        { src: '/media/Olist/Olist Reviews.jpg', caption: 'Reviews Analysis' },
        { src: '/media/Olist/Olist Delivery.jpg', caption: 'Delivery Analysis' }

      ]
    }
  },
  // {
  //   id: 'yolo5',
  //   title: 'YOLO5 - You Only Look Once',
  //   description: 'Training YOLO5 on a custom dataset for hand gesture recognition.',
  //   image: '/media/Computer vision/test.jpg',
  //   animation: '/media/animation/CV.json',
  //   tags: ['Computer Vision', 'ML'],
  //   category: ['CV', 'AI'],
  //   githubUrl: 'https://github.com/AmirMohammadiKarbalaei/YOLO5-Custom-data',
  //   content: {
  //     data: 'In this innovative project, I leverage the cutting-edge capabilities of YOLO5 (You Only Look Once, version 5) for robust hand gesture recognition. YOLO5 is a state-of-the-art real-time object detection system, and in this context, it serves as a powerful tool to accurately identify and analyze hand gestures.',
  //     processSections: {
  //       'Data Collection & Annotation': 'Captured webcam images, curated diverse lighting and background examples and annotated bounding boxes in YOLO format.',
  //       'Training & Augmentation': 'Applied augmentation (flip, scale, color jitter) and trained YOLOv5 with tuned hyperparameters for robust detection.',
  //       'Evaluation': 'Measured mAP and inspected confusion matrices; average accuracy around 75% with additional improvement potential through more data.'
  //     },
  //     keyFindings: [
  //       'Successfully achieved 75% average accuracy on custom hand gesture dataset',
  //       'Real-time object detection capabilities demonstrated',
  //       'Effective custom data collection and annotation process established',
  //       'YOLO5 proved suitable for gesture recognition applications',
  //       'Bounding box methodology effective for gesture delineation'
  //     ],
  //     images: [
  //       { src: '/media/Computer vision/test.jpg', caption: 'Model Accuracy and Performance Results' }
  //     ]
  //   }
  // },
  {
    id: 'eeg-detection',
    title: 'EEG Detection - Neurological Disability Hand Function',
    description: 'Leverage Electroencephalogram data analysis to identify and predict hand movements.',
    image: '/media/EEG/PCA.png',
    animation: '/media/animation/CMI.json',
    tags: ['ML', 'Time-Series', 'Classification', 'EDA'],
    category: ['TimeSeries', 'AI'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/Kaggle-Grasp-and-Lift-EEG-Detection',
    content: {
      data: 'This project aims to address the critical need for assisting patients with neurological disabilities or limb amputations in regaining the ability to perform fundamental hand functions. We leverage EEG (Electroencephalogram) data analysis to identify and understand simple hand movements. The dataset contains 12 subjects with 10 series of trials each, detecting 6 events in Grasp-and-Lift (GAL) sequences.',
      processSections: {
        'Signal Processing & EDA': 'Applied Butterworth filtering to clean EEG signals, visualised raw and processed channels and investigated trial-level statistics.',
        'Event Detection & Labeling': 'Extracted events for GAL sequences and aligned signals to events for supervised learning.',
        'Dimensionality Reduction': 'Used PCA to reduce feature dimensionality while retaining key variance.',
        'Modeling': [
          'Tested classical ML (Random Forest, KNN, XGBoost) and deep learning approaches (CNN, ResNet).',
          'ResNet achieved the best results (~32% accuracy) on the 7-class task, outperforming baselines.'
        ]
      },
      keyFindings: [
        'ResNet demonstrated superiority achieving 32% accuracy in 7-class classification',
        'Performance more than double random guess accuracy (14.3% for 7-class task)',
        'Successfully detected 6 GAL events: HandStart, FirstDigitTouch, BothStartLoadPhase, LiftOff, Replace, BothReleased',
        'PCA effectively reduced dimensionality while preserving essential features',
        'Butterworth filtering improved signal quality and model performance',
        'Deep learning models outperformed traditional machine learning approaches',
        'EEG signals provided meaningful insights for neurological disability assistance'
      ],
      limitations: [
        'Accuracy limited to 32%, indicating significant room for improvement',
        'Complex 7-class classification task remains challenging',
        'EEG signal interpretation requires advanced feature engineering',
        'Limited dataset size with only 12 subjects may affect generalization',
        'Need for more sophisticated temporal modeling approaches'
      ],
      images: [
        { src: '/media/EEG/data viz not processed.png', caption: 'Raw EEG Data Visualization' },
        { src: '/media/EEG/data viz processed.png', caption: 'Processed EEG Data After Filtering' },
        { src: '/media/EEG/PCA.png', caption: 'Principal Component Analysis - Dimensionality Reduction' },
        { src: '/media/EEG/Random forest evaluation.png', caption: 'Random Forest Model Evaluation Results' }
      ]
    }
  },
  {
    id: 'top-sellers',
    title: 'Top Sellers',
    description: 'Analysis of Amazon\'s Top 50 bestselling books from 2009 to 2019.',
    image: '/media/Amazon Top50 Books/BoxPlot.png',
    animation: '/media/animation/book.json',
    tags: ['DA', 'Visualisation'],
    category: ['DA'],
    content: {
      data: 'Comprehensive analysis of Amazon\'s Top 50 bestselling books from 2009 to 2019, exploring trends, patterns, and insights in the publishing industry.',
      processSections: {
        'Data Preparation': 'Load and harmonise Top 50 books datasets across years and standardise metadata such as genres and publication year.',
        'Exploratory Analysis': 'Visualise sales, ratings and distributions to identify outliers and trends.',
        'Dashboarding & Reporting': 'Create visualisations and dashboards to make publishing insights actionable.'
      },
      keyFindings: [
        'Certain genres dominate top-seller lists in multiple years, indicating persistent reader preferences.',
        'There are clear outliers in sales and ratings which correlate with marketing events and seasonal releases.',
        'Relationship plots reveal modest correlation between rating and sales, driven by a few blockbuster titles.'
      ],
      limitations: [
        'Data limited to top-50 lists which may omit long-tail bestsellers and self-published works.',
        'Missing or inconsistent metadata (e.g., genre tags) across years required manual harmonisation.'
      ],
      images: [
        { src: '/media/Amazon Top50 Books/BoxPlot.png', caption: 'Box Plot Analysis' },
        { src: '/media/Amazon Top50 Books/data distribution.png', caption: 'Data Distribution' },
        { src: '/media/Amazon Top50 Books/Relationship.png', caption: 'Relationship Analysis' }
      ]
    }
  },
  {
    id: 'adventure-works',
    title: 'Adventure Works - Retail Sales Analysis',
    description: 'Retail sales analysis for a sample Adventure Works dataset to identify regional and product performance.',
    image: '/media/Adventure_works/Regional sales in best performing country.png',
    animation: '/media/animation/DA.json',
    tags: ['DA', 'Visualisation', 'EDA'],
    category: ['DA', 'BI'],
    content: {
      data: 'The dataset contains product sales, store information, trading duration and sick leave statistics aggregated at store and department levels.',
      process: [
        'Ingested and validated multiple CSV exports, normalised date fields and categorical labels.',
        'Performed exploratory data analysis to identify top-performing regions and seasonal trends.',
        'Aggregated sales metrics by store and department, then visualised revenue vs trading duration.',
        'Produced a short interactive notebook summarising findings and providing reproducible charts.'
      ],
      keyFindings: [
        'Certain stores consistently outperform peers driven by longer average trading duration and higher average spend.',
        'There is a measurable relationship between staff sick-leave hours and store revenue variability in specific departments.',
        'Regional sales variation suggests targeted marketing could improve under-performing areas.'
      ],
      images: [
        { src: '/media/Adventure_works/Regional sales in best performing country.png', caption: 'Regional sales in best performing country' },
        { src: '/media/Adventure_works/Rev vs store trading duration.png', caption: 'Revenue vs store trading duration' },
        { src: '/media/Adventure_works/Average Sick leave Hour  Vs department.png', caption: 'Average sick leave hours vs department' }
      ]
    }
  },
  
  // {
  //   id: 'computer-vision-custom-data',
  //   title: 'Computer Vision - Custom Data',
  //   description: 'Custom computer vision projects that include object detection and image classification experiments on bespoke datasets.',
  //   image: '/media/Computer vision/test.jpg',
  //   animation: '/media/animation/CV.json',
  //   tags: ['Computer Vision', 'YOLO', 'Detection'],
  //   category: ['CV', 'AI'],
  //   githubUrl: 'https://github.com/AmirMohammadiKarbalaei/YOLO5-Custom-data',
  //   content: {
  //     data: 'Custom-labelled image datasets created from webcam captures and curated image collections. Bounding boxes and labels were prepared for training object-detection models.',
  //     process: [
  //       'Captured raw images and curated a representative dataset with varied lighting and backgrounds.',
  //       'Annotated images using bounding-box tools and exported labels in YOLO format.',
  //       'Trained YOLOv5 models with augmentation (flip, scale, color jitter) and tuned hyperparameters for detection performance.',
  //       'Evaluated models using mAP (mean average precision) and confusion matrices; iterated on difficult classes.'
  //     ],
  //     keyFindings: [
  //       'Augmentation and careful class balancing improved detection robustness significantly.',
  //       'YOLOv5 provided real-time detection capability suitable for live webcam applications.',
  //       'Certain gestures/classes needed more diverse examples to reach production-grade accuracy.'
  //     ],
  //     limitations: [
  //       'Small custom dataset limits generalisation to unseen environments.',
  //       'Annotation consistency is critical; noisy labels reduce model performance.'
  //     ],
  //     images: [
  //       { src: '/media/Computer vision/test.jpg', caption: 'Sample detection result and model performance' }
  //     ]
  //   }
  // },
  {
    id: 'global-unemployment',
    title: 'Global Unemployment',
    description: 'Analysing Unemployment Trends Across Age Groups and Genders (2014-2024).',
    image: '/media/Global Unemployment/Average Unemployment Rate for age groups.png',
    animation: '/media/animation/globe.json',
    tags: ['DA', 'Visualisation'],
    category: ['DA'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/Global_Unemployment',
    content: {
      data: 'Understanding the shifts in global unemployment dynamics remains paramount for policymakers, economists, and researchers alike. Spanning from 2014 to 2024, this dataset presents a comprehensive analysis of unemployment trends across diverse demographic dimensions. The central focus lies in examining the data by country, age group, and gender, thereby providing valuable insights into the myriad factors influencing labor markets worldwide.',
      process: [
        'Data collection covering unemployment rates from 2014 to 2024 across multiple countries',
        'Analysis by country, gender, and age group dimensions',
        'Statistical analysis to identify patterns and correlations between demographics',
        'Visualization of trends and comparative analysis across regions',
        'Impact assessment of global events (COVID-19) on unemployment rates'
      ],
      keyFindings: [
        'Djibouti had the highest unemployment rates from 2014 to 2024',
        'Palestinian Territories showed drastic increase from 2014-2018, plateauing until 2021',
        'Cambodia had the lowest unemployment rate with an average as low as 0.4%',
        'Significant COVID-19 impact with noticeable spike in unemployment rates for all countries from 2020-2021',
        'Youth unemployment (15-24 age group) is approximately 2.5 times higher than other age groups',
        'Female unemployment rates consistently higher than male rates due to unequal opportunities',
        'Strong positive correlation between gender unemployment trends over time'
      ],
      images: [
        { src: '/media/Global Unemployment/Lowest unemployement countries.png', caption: 'Countries with Lowest Unemployment Rate' },
        { src: '/media/Global Unemployment/Highest unemployement countries.png', caption: 'Countries with Highest Unemployment Rate' },
        { src: '/media/Global Unemployment/Unemployment Rate for age groups boxplot.png', caption: 'Unemployment Rate for Age Groups' },
        { src: '/media/Global Unemployment/Gendre unemployment rates.png', caption: 'Unemployment Rate For Each Gender Over Time' }
      ]
    }
  }
];