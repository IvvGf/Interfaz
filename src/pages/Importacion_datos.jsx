import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import 'C:/Users/Sofy/Desktop/user-athentication-supabase/src/index.css';

const Importacion_datos = () => {
  const { patientId } = useParams();
  const [file, setFile] = useState(null);
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [pacsSelected, setPacsSelected] = useState(false);

  const handleFileChange = async (e) => {
    setFilesLoaded(false);
    setPacsSelected(false);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const filePath = `${patientId}/${selectedFile.name}`;
      const { data: listData, error: listError } = await supabase
        .storage
        .from('imagenes_pacientes')
        .list(`${patientId}`);
  
      if (listError) {
        console.error('Error listing files:', listError);
        return;
      }
  
      if (listData.length > 0) {
        if (!window.confirm('Precaución: ya se encuentran cargadas las imágenes para este paciente en el PACS, ¿desea sobreescribirlas?')) {
          return;
        }
  
        // Eliminamos todos los archivos que están bajo el path del paciente
        const filesToRemove = listData.map(file => `${patientId}/${file.name}`);
        const { error: deleteError } = await supabase.storage.from('imagenes_pacientes').remove(filesToRemove);
  
        if (deleteError) {
          console.error('Error borrando el archivo:', deleteError);
          return;
        }
      }
  
      // Subimos el nuevo archivo
      const { data, error } = await supabase
        .storage
        .from('imagenes_pacientes')
        .upload(filePath, selectedFile);
  
      if (error) {
        console.error('Error uploading file:', error);
        return;
      }
  
      console.log('File uploaded successfully:', data);
      const fileUrl = supabase.storage.from('imagenes_pacientes').getPublicUrl(filePath).publicURL;
      const { data: patientData, error: updateError } = await supabase
        .from('pacientes')
        .update({ image_url: fileUrl })
        .eq('id', patientId);
  
      if (updateError) {
        console.error('Error updating patient data:', updateError);
      } else {
        console.log('Patient data updated successfully:', patientData);
        setFilesLoaded(true);
      }
    }
  };

  const importFromPACS = async () => {
    setFilesLoaded(false);
    setPacsSelected(false);

    const { data: listData, error: listError } = await supabase
      .storage
      .from('imagenes_pacientes')
      .list(`${patientId}`);

    if (listError) {
      console.error('Error listing files:', listError);
      return;
    }

    if (listData.length === 0) {
      alert('No se encontraron registros preexistentes para este paciente en el PACS. Por favor, importe los datos manualmente.');
      return;
    }

    setPacsSelected(true);
    console.log('Archivos encontrados para el paciente:', listData);
  };

  const handleManualImportClick = async () => {
    setFilesLoaded(false);
    setPacsSelected(false);

    const { data: listData, error: listError } = await supabase
      .storage
      .from('imagenes_pacientes')
      .list(`${patientId}`);
  
    if (listError) {
      console.error('Error listing files:', listError);
      return;
    }
  
    if (listData.length > 0) {
      if (!window.confirm('Precaución: ya se encuentran cargadas las imágenes para este paciente en el PACS, ¿desea sobreescribirlas?')) {
        return;
      }

      // Eliminamos todos los archivos que están bajo el path del paciente
      const filesToRemove = listData.map(file => `${patientId}/${file.name}`);
      const { error: deleteError } = await supabase.storage.from('imagenes_pacientes').remove(filesToRemove);

      if (deleteError) {
        console.error('Error borrando el archivo:', deleteError);
        return;
      }
    }
  
    document.getElementById('file-input').click();
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'Dongle, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'left', fontSize: '60px' }}>Captura de Tomografía</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'initial', minHeight: '70vh', borderRadius: '10px' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ marginLeft:'80px', flex: 1, padding: '20px', boxSizing: 'border-box', position: 'relative' }}>
            {/* <div style={{ marginTop:'0px', marginLeft:'20px', fontSize: '40px', marginBottom: '30px' }}>Opciones de Importación</div> */}
            <button 
              onClick={handleManualImportClick} 
              style={{marginTop:'160px', display: 'block', marginBottom: '40px', padding: '10px 20px', fontSize: '20px', borderRadius: '5px', backgroundColor: '#434573', color: 'white', cursor: 'pointer' }}
            >
              Importar Datos Manualmente
            </button>
            <button
              onClick={importFromPACS}
              style={{ display: 'block', padding: '10px 20px', fontSize: '20px', borderRadius: '5px', backgroundColor: '#434573', color: 'white', cursor: 'pointer' }}
            >
              Importar Datos del PACS
            </button>
          </div>
          <div style={{ width: '2px', backgroundColor: 'black', margin: '0 20px' }}></div> {/* Línea vertical negra */}
          <div style={{ flex: 1, boxSizing: 'border-box' }}>
            {filesLoaded && (
              <div style={{ color: 'green', marginBottom: '10px', fontSize: '18px' }}>
                Se ha realizado correctamente la carga de archivos.
              </div>
            )}
            {pacsSelected && (
              <div style={{ color: 'blue', marginBottom: '10px', fontSize: '18px' }}>
                Se han seleccionado adecuadamente los datos del PACS.
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#F27405'}}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#F27405', border: '1px solid #F27405' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: "#F27405" }}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#ccc', border: '1px solid #ccc' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#ccc', border: '1px solid #ccc' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
          <div style={{ width: '60px', height: '8px', backgroundColor: '#ccc', border: '1px solid #ccc' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <button 
          style={{ padding: '10px 20px', fontSize: '20px', borderRadius: '5px', backgroundColor: '#434573', color: 'white', cursor: 'pointer' }}
        >
          Siguiente
        </button>
      </div>
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Importacion_datos;

