package com.tingeso.marcasrelojservice.services;


import com.tingeso.marcasrelojservice.entities.MarcasRelojEntity;
import lombok.Generated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.tingeso.marcasrelojservice.repositories.MarcasRelojRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@Service
public class MarcasRelojService {

    @Autowired
    private MarcasRelojRepository marcasRelojRepository;

    private final Logger logg = LoggerFactory.getLogger(MarcasRelojService.class);

    public ArrayList<MarcasRelojEntity> obtenerData() {
        return (ArrayList<MarcasRelojEntity>) marcasRelojRepository.findAll();
    }

    public String guardar(MultipartFile file) {
        String filename = file.getOriginalFilename();
        if (filename != null) {
            if ((!file.isEmpty()) && (filename.toUpperCase().equals("DATA.TXT"))) {
                try {
                    byte[] bytes = file.getBytes();
                    Path path = Paths.get(file.getOriginalFilename());
                    Files.write(path, bytes);
                    logg.info("Archivo guardado");
                } catch (IOException e) {
                    logg.error("ERROR", e);
                }
            }
            return "Archivo guardado con exito!";
        } else {
            return "No se pudo guardar el archivo";
        }
    }

    public void leerTxt(String direccion) {
        String texto = "";
        BufferedReader bf = null;
        marcasRelojRepository.deleteAll();
        try {
            bf = new BufferedReader(new FileReader(direccion));
            String temp = "";
            String bfRead;
            while ((bfRead = bf.readLine()) != null) {
                guardarDataDB(bfRead.split(";")[0], bfRead.split(";")[1], bfRead.split(";")[2]);
                temp = temp + "\n" + bfRead;
            }
            texto = temp;
            System.out.println("Archivo leido exitosamente");
        } catch (Exception e) {
            System.err.println("No se encontro el archivo");
        } finally {
            if (bf != null) {
                try {
                    bf.close();
                } catch (IOException e) {
                    logg.error("ERROR", e);
                }
            }
        }
    }

    public void guardarData(MarcasRelojEntity data) {
        marcasRelojRepository.save(data);
    }

    public void guardarDataDB(String fecha, String hora, String rut) {
        MarcasRelojEntity newData = new MarcasRelojEntity();
        newData.setFecha(fecha);
        newData.setRut(rut);
        newData.setHora(hora);
        guardarData(newData);
    }

    public List<String> obtenerRuts() {
        return marcasRelojRepository.findDistinctRut();
    }

    public void eliminarData(ArrayList<MarcasRelojEntity> datas){
        marcasRelojRepository.deleteAll(datas);
    }
}