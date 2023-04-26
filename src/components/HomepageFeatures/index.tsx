import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AWS Amplify',
    Svg: require('@site/static/img/aws.svg').default,
    description: (
      <>
        🧰 Skrzynka z narzędziami, z którą stworzysz backend w parę chwil!
      </>
    ),
  },
  {
    title: 'React',
    Svg: require('@site/static/img/react.svg').default,
    description: (
      <>
        🌐 Najpopularniejszy framework Front-end. 
      </>
    ),
  },
  {
    title: 'JavaScript',
    Svg: require('@site/static/img/js.svg').default,
    description: (
      <>
        💔 Pokochaj albo rzuć... 
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
