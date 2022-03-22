// GET: /pages/api/courses/mentees/[mentee_id].js
import { db } from '../../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore";

export default async function getCoursesAndAddMenteeByMenteeId(req, res) {
  const { mentee_id } = req.query;

  try {
    const coursesQuery = query(collection(db, 'courses'));
    const result = [];
    const querySnapshot = await getDocs(coursesQuery);
    querySnapshot.forEach(doc => {
      const menteeList =  doc.data().mentees;
      menteeList.forEach(mentee => {
        if (mentee.id === Number(mentee_id)) {
          result.push(doc.data());
        }
      })
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(`Error retrieving courses by mentee id: ${err}`);
  }
}