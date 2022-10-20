
import {MongoClient} from 'mongodb';

// import { useEffect, useState } from 'react';
import Head  from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {


  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}


// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

  export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://Collexy:BGnnJwV3lGRQweV6@cluster0.nvmxkul.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();


  return {
          props: {
            meetups: JSON.parse(
              JSON.stringify(
                meetups.map((meetup) => ({
                  title: meetup.title,
                  address: meetup.address,
                  source: meetup.source,
                  id: meetup._id.toString(),
                }))
              )
            ),
          },
          revalidate: 1,
        }
  // return {
  //   props: {
  //     meetups: meetups.map((meetup) => ({
  //       title: meetup.title,
  //       address: meetup.address,
  //       image: meetup.image,
  //       id: meetup._id.toString(),
  //     })),
  //   },
  //   revalidate: 1,
  // };
}
export default HomePage;

//.........................................

//.......................................................
// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!'
//   }
// ];

// function HomePage(props) {


//   return ( <Fragment>
//   <Head>
//     <title>React Meetups</title>
//     <meta name="description" 
//     content="Browse a Huge List of highly active Meetups!"
//     />
//   </Head>
//   <MeetupList meetups={props.meetups} />;
//   </Fragment>
//   )
// }

// export async function getStaticProps() {
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//     revalidate: 1
//   }; 
// }

// export async function getServerSideProps (context) {
//   // fetch Data from an API
// const req =  context.req;
// const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

// export default HomePage;

