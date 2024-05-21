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
        const existingFile = listData[0]; // Obtenemos el primer archivo de la lista
        const existingFileId = existingFile.id; // Obtenemos el id del archivo existente
  
        if (!window.confirm('Precaución: ya se encuentran cargadas las imágenes para este paciente en el PACS, ¿desea sobreescribirlas?')) {
          return;
        }
  
        // Eliminamos el archivo existente
        const { error: deleteError } = await supabase
          .storage
          .from('imagenes_pacientes')
          .remove([existingFileId]);
  
        if (deleteError) {
          console.error('Error deleting existing file:', deleteError);
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

      const existingFile = listData[0];
      const { error: deleteError } = await supabase
        .storage
        .from('imagenes_pacientes')
        .remove([existingFile.id]);
  
      if (deleteError) {
        console.error('Error deleting existing file:', deleteError);
        return;
      }
    }
  
    document.getElementById('file-input').click();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          onClick={handleManualImportClick}
          style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          Importar Datos Manualmente
        </button>
        <button
          onClick={importFromPACS}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Importar Datos del PACS
        </button>
      </div>
      {filesLoaded && (
        <div style={{ color: 'green', marginTop: '20px', fontSize: '18px' }}>
          Se ha realizado correctamente la carga de archivos.
        </div>
      )}
      {pacsSelected && (
        <div style={{ color: 'blue', marginTop: '20px', fontSize: '18px' }}>
          Se han seleccionado adecuadamente los datos del PACS.
        </div>
      )}
    </div>
  );
};

export default Importacion_datos;
