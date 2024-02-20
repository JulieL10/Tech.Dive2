import React, { useEffect, useState } from 'react';
import { fetchExams } from '../hooks/examApi';
import Table from 'react-bootstrap/Table';
import '../App.css';

const ExamPage = ({ input }) => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExams();
        setExams(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [input]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const filterExams = exams.filter((exam) => 
    input === '' ? true : exam.patientID.toLowerCase().includes(input.toLowerCase()));

    return (
      <>
        {filterExams.length > 0 ? (
          <Table className='table' bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Exam ID</th>
                <th>Image</th>
                <th>Key Findings</th>
                <th>Brixia Score</th>
                <th>Age</th>
                <th>Sex</th>
                <th>BMI</th>
                <th>Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {filterExams.map((exam) => (
                exam && (
                  <tr key={exam.examID}>
                    <td>{exam.patientID}</td>
                    <td>{exam.examID}</td>
                    <td>
                      <img
                        src={exam.image}
                        alt={exam.examID}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td className='keyFindings'>{exam.keyFindings}</td>
                    <td>{exam.brixiaScore}</td>
                    <td>{exam.age}</td>
                    <td>{exam.sex}</td>
                    <td>{exam.bmi}</td>
                    <td>{exam.zipCode}</td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        ) : (
          <div>No matching exams found.</div>
        )}
      </>
    );
  };

export default ExamPage;
