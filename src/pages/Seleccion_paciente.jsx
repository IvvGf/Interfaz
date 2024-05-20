import React, { useState } from 'react';
import { supabase } from '../client';
import 'C:/Users/Sofy/Desktop/user-athentication-supabase/src/index.css';

const Seleccion_paciente = () => {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    Sexo: '',
    diagnostico: ''
  });

  async function handleSearch() {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .select('*')
        .eq('id', patientId)
        .single();
      
      if (error) throw error;
      setPatientData({
        nombre: data.nombre,
        apellidos: data.apellidos,
        edad: data.edad,
        Sexo: data.Sexo,
        diagnostico: data.diagnostico
      });
    } catch (error) {
      console.error('Error fetching patient data:', error);
      alert('No se encontró registro');
    }
  }

  return (
    <div style={{ padding: '10px', fontFamily: 'Dongle, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'left', fontSize: '60px' }}>Selección del paciente</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', borderRadius: '10px' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ marginLeft:'70px', flex: 1, padding: '20px', borderRight: '2px solid black', boxSizing: 'border-box', position: 'relative' }}>
            <div style={{ marginTop:'40px', marginLeft:'30px', fontSize: '40px', marginBottom: '30px' }}>Selecciona al paciente</div>
            <div style={{ marginLeft:'50px', position: 'relative', marginBottom: '50px', maxWidth: '300px' }}>
              <span style={{ position: 'absolute', top: '-15px', left: '10px', backgroundColor: 'white', padding: '0 5px', fontSize: '25px' }}>ID del Paciente</span>
              <input
                style={{ width: '100%', padding: '10px', fontSize: '20px', borderRadius: '5px', border: '2px solid black', height:'60px' }}
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSearch} 
              style={{ marginTop:'50px' ,padding: '10px 20px', fontSize: '20px', borderRadius: '5px', backgroundColor: '#434573', color: 'white', cursor: 'pointer' }}>
              Buscar
            </button>
          </div>
          <div style={{ flex: 1, marginLeft: '108px', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '0px', fontSize: '40px', fontWeight: 'bold' }}>Datos Generales</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '30px', display: 'block', marginBottom: '0px' }}>Nombre:</label>
                <div style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', backgroundColor:'#F7EBDF4D', height:'20px', width:'300px', fontSize:'27px', lineHeight: '20px' }}>
                  {patientData.nombre}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '30px', display: 'block', marginBottom: '0px' }}>Apellidos:</label>
                <div style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', backgroundColor:'#F7EBDF4D', height:'20px', width:'300px',fontSize:'27px', lineHeight: '20px' }}>
                  {patientData.apellidos}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '30px', display: 'block', marginBottom: '0px' }}>Edad:</label>
                  <div style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', backgroundColor:'#F7EBDF4D', height:'20px', width:'135px',fontSize:'27px', lineHeight: '20px' }}>
                    {patientData.edad}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '30px', display: 'block', marginBottom: '0px' }}>Sexo:</label>
                  <div style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', backgroundColor:'#F7EBDF4D', height:'20px', width:'135px',fontSize:'27px', lineHeight: '20px' }}>
                    {patientData.Sexo}
                  </div>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '30px', display: 'block', marginBottom: '0px' }}>Diagnóstico:</label>
                <div style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', backgroundColor:'#F7EBDF4D', height:'80px', width:'300px',fontSize:'27px', lineHeight: '20px' }}>
                  {patientData.diagnostico}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#F27405'}}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#F27405' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Seleccion_paciente;
