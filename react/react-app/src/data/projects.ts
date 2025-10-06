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
    keyFindings?: string[];
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
        'Exploratory Data Analysis (EDA): After comprehensive data cleansing, the dataset has undergone thorough exploratory analysis. Each feature has been carefully examined to determine acceptable ranges and ensure data integrity.',
        'Feature Engineering: To enhance model performance, new features such as interactions between features have been integrated. The importance of these features has been evaluated using SHAP (Shapley Additive Explanations).',
        'Synthetic Minority Oversampling Technique (SMOTE): SMOTE is an oversampling method specifically designed for minority classes, generating synthetic samples to address overfitting issues associated with random oversampling. By employing this technique, we augment the data points in the minority class, thereby enhancing the models ability to effectively learn from imbalanced datasets.',
        'Model Implementation: Various ML models have been implemented with Random Forest classifier scoring the highest with 93% accuracy.',
        'Deployment: Following a comparative evaluation, the random forest (RF) model has been selected for deployment due to its performance similarity to the deep learning model.'
      ],
      images: [
        { src: '/media/diabetes/Data-Table.png', caption: 'Dataset Overview' },
        { src: '/media/diabetes/EDA.png', caption: 'Feature distributions' },
        { src: '/media/diabetes/Feature-Corr.png', caption: 'Feature Correlation' },
        { src: '/media/diabetes/Feature-importance.png', caption: 'Random Forest feature importance' },
        { src: '/media/diabetes/NNloss.png', caption: 'NN Model Loss' },
        { src: '/media/diabetes/NNacc.png', caption: 'NN Model Accuracy' }
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
      keyFindings: [
        'Overview: France constitutes the majority of the orders, comprising 88% of total orders, while other countries contribute approximately 6%. Customer demographics reveal an even distribution of gender, with a significant presence of young adults and adults.',
        'Profit: The business has generated a total profit of 904k pounds, with an average profit per product sold of 193 pounds. Mountain bikes emerge as the highest profit-generating products.',
        'Orders: A progressive increase in orders can be seen, expecting nearly 2000 orders annually by 2020. Accessories, particularly patch kits, dominate product lineup.'
      ],
      limitations: [
        'While our analysis provides valuable insights, it\'s important to acknowledge limitations such as the lack of customer-related information, which hinders the exploration of crucial metrics like customer retention rate and sentiment.'
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
      process: [
        'Designing and implementing a PostgreSQL database optimised for performance and data protection',
        'Setting up secure, automated data collection pipelines using LDAP and RFID technologies',
        'Creating intuitive Power BI visualisations tailored to the needs of stakeholders',
        'Implementing GDPR-compliant data management systems',
        'Developing comprehensive documentation for maintenance and long-term usability'
      ],
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
      data: 'The "Zzzs" you catch each night are crucial for your overall health. Sleep affects everything from your development to cognitive functioning. This project aims to help researchers better analyse wrist-worn accelerometer data for sleep monitoring, enabling large-scale studies to improve understanding of sleep\'s importance and function. The dataset comprises about 500 multi-day recordings of wrist-worn accelerometer data annotated with sleep onset and wakeup events.',
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
        'Data Preprocessing: Robust data preprocessing capabilities, including handling of missing values, encoding of categorical variables, and normalisation of numerical features, to ensure data integrity and model accuracy.',
        'Machine Learning Models: Integration of multiple machine learning models, including a deep learning model (FraudDetectionModel) and a random forest model (FraudDetectionRFModel), tailored for high-performance fraud detection.',
        'Model Evaluation: Comprehensive model evaluation metrics, including accuracy, precision, recall, and F1 score, to rigorously assess the effectiveness of each model.',
        'Model Persistence: Support for saving and loading trained models, enabling seamless deployment and reuse in various operational environments.'
      ],
      keyFindings: [
        'System Requirements: Python, Pandas for data manipulation, Numpy for numerical computations, Torch for deep learning, Scikit-Learn for machine learning, Matplotlib and Seaborn for data visualisation.',
        'Usage Instructions: Data preparation involves downloading the relevant dataset and using the DataPreprocessing module. Model training uses both deep learning and random forest approaches.',
        'Example Use Cases: Fraud Detection for preventing fraudulent transactions and Model Comparison for optimising fraud detection approaches.'
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
    content: {
      data: 'A personalized daily news recommendation system that uses Natural Language Processing and Machine Learning to curate relevant news articles based on user preferences.',
      images: [
        { src: '/media/DailyLinkAI/app_screenshot.png', caption: 'Application Screenshot' }
      ]
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
      process: [
        'Random Action: In early training stages, agent takes random actions to explore environment and populate Q-table',
        'Calculate Reward and Expected Reward: Agent interacts with environment, receives rewards, and updates Q-table',
        'Q-Table Initialization: Initialize Q-table representing state-action space with arbitrary values',
        'Exploration-Exploitation Strategy: Balance exploration of environment with exploitation of learned knowledge',
        'Q-Table Update: Update Q-table based on observed reward and difference between expected and actual Q-values',
        'Repeat Until Session Time is Over: Continue exploration-exploitation loop until predefined session time ends'
      ],
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
      process: [
        'Data Understanding: Each sample in the data contains the text of a tweet, a keyword from that tweet (although this may be blank), and the location the tweet was sent from (may also be blank).',
        'Data Cleaning: The tweets underwent multiple rounds of cleaning, encompassing tasks such as removing punctuations and eliminating non-English words.',
        'Data Preparation: Tweets have been vectorized and split into training and test sets.',
        'Model Implementation: A Naive Bayes model has been successfully implemented for the task, achieving a test accuracy of 78%.'
      ],
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
      data: 'Comprehensive analysis of customer data from a Brazilian e-commerce platform, providing insights into customer behavior, sales patterns, and business performance.'
    }
  },
  {
    id: 'yolo5',
    title: 'YOLO5 - You Only Look Once',
    description: 'Training YOLO5 on a custom dataset for hand gesture recognition.',
    image: '/media/Computer vision/test.jpg',
    animation: '/media/animation/CV.json',
    tags: ['Computer Vision', 'ML'],
    category: ['CV', 'AI'],
    githubUrl: 'https://github.com/AmirMohammadiKarbalaei/YOLO5-Custom-data',
    content: {
      data: 'In this innovative project, I leverage the cutting-edge capabilities of YOLO5 (You Only Look Once, version 5) for robust hand gesture recognition. YOLO5 is a state-of-the-art real-time object detection system, and in this context, it serves as a powerful tool to accurately identify and analyze hand gestures.',
      process: [
        'Data Collection and Annotation: Images were acquired through a webcam for real-time capture',
        'Custom dataset creation with meticulous labeling using bounding boxes',
        'Application of bounding boxes to delineate specific regions of interest within the pictures',
        'Model Implementation: YOLO5 training on custom images with optimization',
        'Model evaluation and accuracy assessment achieving 75% average accuracy'
      ],
      keyFindings: [
        'Successfully achieved 75% average accuracy on custom hand gesture dataset',
        'Real-time object detection capabilities demonstrated',
        'Effective custom data collection and annotation process established',
        'YOLO5 proved suitable for gesture recognition applications',
        'Bounding box methodology effective for gesture delineation'
      ],
      images: [
        { src: '/media/Computer vision/test.jpg', caption: 'Model Accuracy and Performance Results' }
      ]
    }
  },
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
      process: [
        'Exploratory Data Analysis: Data cleaning and filtering using Butterworth Filter',
        'Event Detection: Identified and extracted data for each class based on processed labels',
        'Dimensionality Reduction: Applied Principal Component Analysis (PCA) to reduce features and enhance efficiency',
        'Model Implementation: Tested various models including Random Forest, K Nearest Neighbor, XGBoost',
        'Deep Learning: Implemented CNN and ResNet models for advanced pattern recognition',
        'Model Evaluation: ResNet achieved superior performance with 32% accuracy (double random guess accuracy)'
      ],
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
      images: [
        { src: '/media/Amazon Top50 Books/BoxPlot.png', caption: 'Box Plot Analysis' },
        { src: '/media/Amazon Top50 Books/data distribution.png', caption: 'Data Distribution' },
        { src: '/media/Amazon Top50 Books/Relationship.png', caption: 'Relationship Analysis' }
      ]
    }
  },
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