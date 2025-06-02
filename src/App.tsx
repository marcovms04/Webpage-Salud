import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Equipment data interface
interface Equipment {
  name: string;
  brand: string;
  model: string;
  userManual?: string;
  serviceManual?: string;
  hasUserManual?: boolean;
  hasServiceManual?: boolean;
}

interface ManualMapping {
  [key: number]: {
    userManual: string;
    serviceManual: string;
  };
}

// Sample equipment data
const equipmentList: Omit<Equipment, 'userManual' | 'serviceManual'>[] = [
  { name: 'Arco en C', brand: 'Philips', model: 'Bv Pulsera' },
  { name: 'Arco en C', brand: 'Philips', model: 'Bv Endura' },
  { name: 'Bascula Electronica', brand: 'Detecto', model: '8430' },
  { name: 'Rayos X Fija Digital', brand: 'Philips', model: 'Digital Diagnost' },
  { name: 'Rayos X Fija Analogica', brand: 'Siemens', model: 'Multix Top' },
  { name: 'Calentador De Gel', brand: 'Parker', model: 'Therma Sonic' },
  { name: 'Calibrador De Dosis', brand: 'Capintec', model: 'Crc-25R' },
  { name: 'Fluoroscopio', brand: 'Siemens', model: 'Luminos Fusion' },
  { name: 'Medidor de Radiacion', brand: 'Ludlum Measurements', model: '14C/44-9' },
  { name: 'Impresora Calibrador de Dosis', brand: 'Capintec', model: 'M188D' },
  { name: 'Maquina de Anestesia', brand: 'Dräger', model: 'Fabius MRI' },
  { name: 'Mastografo', brand: 'Hologic', model: 'Selenia Dimennsions' },
  { name: 'Resonancia Magnetica', brand: 'Siemens', model: 'Magnetom Aera' },
  { name: 'Unidad de enfriamiento (Chiller)', brand: 'KKT', model: 'ECO122' },
  { name: 'Sistema De Biopsia', brand: 'Bard', model: 'Encorenspire' },
  { name: 'Spect-Ct', brand: 'Siemens', model: 'Symbia T16' },
  { name: 'Tomografo', brand: 'Siemens', model: 'Somatom Definition Flash' },
  { name: 'Unidad de Enfriamiento (Chiller)', brand: 'Ridel', model: '7741551' },
  { name: 'Estacion de Trabajo Spect-Ct', brand: 'Siemens', model: 'Symbia.Net' },
  { name: 'Ultrasonido', brand: 'Philips', model: 'Cx50' },
  { name: 'Ultrasonido', brand: 'Philips', model: 'Epiq 7G' },
  { name: 'Ultrasonido', brand: 'Philips', model: 'Epiq 7W' },
  { name: 'Ultrasonido', brand: 'Ge', model: 'Logiq E9 R6' },
  { name: 'Geiger', brand: 'Ludlum Measurements', model: '12' },
  { name: 'Estacion de Trabajo Tomografia', brand: 'Siemens', model: 'Syngo Mm' },
  { name: 'Estacion de Trabajo Tomografia', brand: 'Siemens', model: 'Syngo Via' },
  { name: 'Detector', brand: 'Carestream', model: 'Focus 35C' },
  { name: 'Ultrasonido', brand: 'Ge', model: 'Venue' },
  { name: 'Monitor Grado Medico', brand: 'Barco', model: 'Fusion 6Mp' },
  { name: 'Inyector de Medios de Contraste', brand: 'Medrad', model: 'Stellant' },
  { name: 'Calibrador de Dosis', brand: 'Capintec', model: 'Crc-127R' },
  { name: 'Maquina de Anestesia', brand: 'Ge', model: 'Carestation 620' },
  { name: 'Monitor de Signos Vitales', brand: 'Ge', model: 'B105' },
  { name: 'Inyector de Medios de Contraste', brand: 'Medrad', model: 'Stellant Ws' },
  { name: 'Pet-Ct', brand: 'Ge', model: 'Discovery Mi' },
  { name: 'Sistema de Biopsia', brand: 'Bard', model: 'Encor Enspire' },
  { name: 'Estacion de Carga MRI', brand: 'Bbraun', model: 'Space Station MRI' },
  { name: 'Negatoscopio', brand: 'Maxant', model: 'Ts202Nfmxsihg' },
  { name: 'Estacion de Postproceso', brand: 'Dell', model: 'Cvi4' },
  { name: 'Arco en C', brand: 'Philips', model: 'Zenition 70' },
  { name: 'Mastografo', brand: 'Hologic', model: 'Dimensions' },
  { name: 'Estacion de Postproceso Ctrevaw', brand: 'Ge', model: 'Aw4.-Z4 G4-Hw Platform' },
  { name: 'Monitor Grado Medico', brand: 'Barco', model: 'Coronis Uniti MDMC-12133' },
  { name: 'Monitor Grado Medico', brand: 'Barco', model: 'Coronis Fusion 6MP MDCC-6230' },
  { name: 'Ultrasonido', brand: 'Ge', model: 'Venue Go R2' },
  { name: 'Aspirador Portatil', brand: 'Drive Medical', model: '18600' },
  { name: 'Espirometro', brand: 'Micromedical', model: 'Microplus' },
  { name: 'Micronebulizador', brand: 'Aerogen', model: 'Pro-X Solo' },
  { name: 'Micronebulizador', brand: 'Aerogen', model: 'Aerogen Usb' },
  { name: 'Espirometro', brand: 'Nspire', model: 'Wright Mk8' },
  { name: 'Monitor de Oxido Nitrico', brand: 'Noxbox', model: 'Noxbox' },
  { name: 'Aspirador Portatil', brand: 'Medela', model: 'Vario' },
  { name: 'Citometro de Flujo', brand: 'Beckman Coulter', model: 'CytoFLEX' },
  { name: 'Analizador de Inmunoensayos', brand: 'Abbott', model: 'Architect |1000Sr' },
  { name: 'Centrifuga', brand: 'Licon', model: 'Dgspin' },
  { name: 'Incubador/Agitador de Plaquetas', brand: 'Terumo', model: 'P1200' },
  { name: 'Centrifuga Refrigerada', brand: 'Beckman Coulter', model: 'J6Mi' },
  { name: 'Balanza Mezcladora', brand: 'Terumo Bct', model: 'T-Rac' },
  { name: 'Balanza Electronica', brand: 'Ohaus', model: 'Bw3Us' },
  { name: 'Bascula Colgante', brand: 'Detecto', model: 'Mcs10Kgf' },
  { name: 'Estufa de Secado ', brand: 'Yamato', model: 'Dkn602C' },
  { name: 'Incubadora', brand: 'Grifols', model: 'Dgtherm' },
  { name: 'Agitador de Plaquetas', brand: 'Terumo', model: 'Pai084' },
  { name: 'Conector Estetril de Tubos', brand: 'Terumo Bct', model: 'Sc-201A' },
  { name: 'Ultracongelador', brand: 'Terumo', model: 'Thermo Scientific' },
  { name: 'Conector Estetril de Tubos', brand: 'Terumo Bct', model: 'Tscd-li' },
  { name: 'Analizador de Hematologia', brand: 'Abbott', model: 'Cell Dyn Emerald 18' },
  { name: 'Gasometro', brand: 'Instrumentation Laboratory', model: 'Gem Premier 3500' },
  { name: 'Refrigerador', brand: 'Thermo Scientific', model: 'Reb5004D22' },
  { name: 'Microscopio', brand: 'Zeiss', model: 'Axio Lab.A1' },
  { name: 'Centrifuga', brand: 'Hamilton Bell', model: 'Vanguard V6500' },
  { name: 'Teñidor de Laminillas', brand: 'Siemens', model: 'Hematek 4488C' },
  { name: 'Campana de Flujo Laminar', brand: 'Thermo Scientific', model: 'Shandon Grosslab Senior' },
  { name: 'Termometro Infrarrojo', brand: 'Thermofocus', model: 'Bv-1500' },
  { name: 'Estufa de Secado', brand: 'Yamato', model: 'Dvs402' },
  { name: 'Centrifuga', brand: 'Thermo Scientific', model: 'Cl10' },
  { name: 'Agitador Vortex', brand: 'Thermo Scientific', model: 'M37615' },
  { name: 'Estufa de Secado', brand: 'Redline By Binder', model: 'Re-53-Ul' },
  { name: 'Gabinete de Bioseguridad Clase II', brand: 'Labconco', model: 'Bioseguridad Class II' },
  { name: 'Incubadora', brand: 'Yamato', model: 'Ic603C' },
  { name: 'Incubadora', brand: 'Yamato', model: 'Ic103C' },
  { name: 'Microscopio', brand: 'Zeiss', model: 'Axio Scope A1' },
  { name: 'Esterilizador de Vapor', brand: 'Jorsan', model: 'Xg-11' },
  { name: 'Sistema de Hermocultivos', brand: 'Becton Dickinson', model: 'Bactec 9050' },
  { name: 'Sistema de Pcr', brand: 'Biomerieux', model: 'Film Array Torch' },
  { name: 'Lampara de Examinacion', brand: 'Philips', model: 'Se50Fl' },
  { name: 'Sierra para Hueso', brand: 'Stryker', model: '810' },
  { name: 'Campana de Flujo Laminar', brand: 'Labconco', model: '9750601' },
  { name: 'Cuarto Frio', brand: 'Thermo Scientific', model: '2Lo' },
  { name: 'Criostato', brand: 'Microm Gmblt', model: 'Hydraxc26' },
  { name: 'Criostato', brand: 'Microm Gmblt', model: 'Hydraxc25' },
  { name: 'Bascula Colgante', brand: 'Detecto', model: 'H6220' },
  { name: 'Balanza Electronica', brand: 'Ohaus', model: 'Scoutpro 2001' },
  { name: 'Analizador de Bioquimica Clinica', brand: 'Abbott', model: 'Architect C8000' },
  { name: 'Ultracongelador', brand: 'Thermo Scientific', model: 'B294' },
  { name: 'Congelador', brand: 'Thermo Scientific', model: 'Jewett Hema Pro 2000 Lf' },
  { name: 'Baño de Agua', brand: 'Labtech', model: 'Lwb-111D' },
  { name: 'Campana de Flujo Laminar', brand: 'Labconco', model: '9750605' },
  { name: 'Refractometro', brand: 'Reichert', model: 'Vet360' },
  { name: 'Medidor de Ph', brand: 'Ohaus', model: 'St10' },
  { name: 'Medidor de Hemoglobina', brand: 'Acon Laboratories', model: 'Mission Hb' },
  { name: 'Mesa de Exploracion', brand: 'Umf', model: '5140Jj' },
  { name: 'Analizador Plaquetario', brand: 'Werfen', model: 'Verifynow' },
  { name: 'Sistema de Cultivo de Micobacterias', brand: 'Becton Dickinson', model: 'Bactec Mgit 320' },
  { name: 'Sistema de Hemocultivos', brand: 'Becton Dickinson', model: 'Bactec Fx' },
  { name: 'Refrigerador', brand: 'Terumo Bct', model: 'Bbr600G' },
  { name: 'Ultracongelador', brand: 'Terumo Bct', model: 'Df-80U' },
  { name: 'Extractor Automatico de Componentes Sanguineos', brand: 'Terumo Bct', model: 'T-Ace li+' },
  { name: 'Estacion de Donacion', brand: 'Terumo Bct', model: 'Dc200' },
  { name: 'Balanza Mezcladora', brand: 'Terumo Bct', model: 'T-Rac li Wifi' },
  { name: 'Incubadora', brand: 'Yamato', model: 'lc 402' },
  { name: 'Incubadora', brand: 'Thermo Scientific', model: '490' },
  { name: 'Gasometro', brand: 'Instrumentation Laboratory', model: 'Gem Premier 5000' },
  { name: 'Espectrometro Maldi-Tof', brand: 'Bruker', model: 'Microflex Lt/Sh' },
  { name: 'Equipo de Identificacion y Susceptibilidad', brand: 'Becton Dickinson', model: 'Phoenix M50' },
  { name: 'Sistema de Hemocultivos', brand: 'Becton Dickinson', model: 'Bactec Fx40' },
  { name: 'Agitador de Vortex', brand: 'Scientific Industries', model: 'Genie li Si-0236' },
  { name: 'Rotador', brand: 'Stuart', model: 'Sb2' },
  { name: 'Ultracongelador', brand: 'Phcbi', model: 'Mdf-Du502Vha-Pa' },
  { name: 'Microcentrifuga', brand: 'Eppendorf', model: '5452' },
  { name: 'Bascula Electronica', brand: 'Seca', model: '830' },
  { name: 'Baumanometro Digital', brand: 'Drive Medical', model: 'Bp3600' },
  { name: 'Centrifuga Refrigerada', brand: 'Thermo Scientific', model: 'Sorvall St8' },
  { name: 'Extractor', brand: 'Qiagen', model: '9003210' },
  { name: 'Termociclador', brand: 'Qiagen', model: 'Rotor-Gen Q' },
  { name: 'Termociclador', brand: 'Qiagen', model: 'Qiastat-Dx' },
  { name: 'Thermomix', brand: 'Dlab', model: 'HCM100-Pro' }
];

// Mapeo explícito de manuales a equipos
const manualMapping: ManualMapping = {
  // Ejemplo: si el equipo 44 tiene manuales, pero el 45 no, y el 46 sí:
  1: { userManual: '/1_Equipo.pdf', serviceManual: '/1_Equipo_Servicio.pdf' },
  2: { userManual: '/2_Equipo.pdf', serviceManual: '/2_Equipo_Servicio.pdf' },
  3: { userManual: '/3_Equipo.pdf', serviceManual:'' },
  4: { userManual: '/4_Equipo.pdf', serviceManual: '/4_Equipo_Servicio.pdf' },
  5: { userManual: '/5_Equipo.pdf', serviceManual: '' },
  6: { userManual: '/6_Equipo.pdf', serviceManual: '' },
  7: { userManual: '/7_Equipo.pdf', serviceManual: '' },
  8: { userManual: '/8_Equipo.pdf', serviceManual: '' },
  9: { userManual: '/9_Equipo.pdf', serviceManual: '/9_Equipo_Servicio.pdf' },
  10: { userManual: '/10_Equipo.pdf', serviceManual: '/10_Equipo_Servicio.pdf' },
  11: { userManual: '/11_Equipo.pdf', serviceManual: '/11_Equipo_Servicio.pdf' },
  12: { userManual: '/12_Equipo.pdf', serviceManual: '/12_Equipo_Servicio.pdf' },
  13: { userManual: '/13_Equipo.pdf', serviceManual: '/13_Equipo_Servicio.pdf' },
  14: { userManual: '/14_Equipo.pdf', serviceManual: '/14_Equipo_Servicio.pdf' },
  15: { userManual: '/15_Equipo.pdf', serviceManual: '' },
  16: { userManual: '/16_Equipo.pdf', serviceManual: '' },
  18: { userManual: '/18_Equipo.pdf', serviceManual: '' },
  20: { userManual: '/20_Equipo.pdf', serviceManual: '/20_Equipo_Servicio.pdf' },
  21: { userManual: '/21_Equipo.pdf', serviceManual: '' },
  22: { userManual: '/22_Equipo.pdf', serviceManual: '' },
  23: { userManual: '/23_Equipo.pdf', serviceManual: '/23_Equipo_Servicio.pdf' },
  24: { userManual: '', serviceManual: '/24_Equipo_Servicio.pdf' },
  25: { userManual: '', serviceManual: '/25_Equipo_Servicio.pdf' },
  26: { userManual: '/26_Equipo.pdf', serviceManual: '/26_Equipo_Servicio.pdf' },
  27: { userManual: '/27_Equipo.pdf', serviceManual: '' },
  28: { userManual: '/28_Equipo.pdf', serviceManual: '/28_Equipo_Servicio.pdf' },
  29: { userManual: '/29_Equipo.pdf', serviceManual: '' },
  30: { userManual: '/30_Equipo.pdf', serviceManual: '/30_Equipo_Servicio.pdf' },
  32: { userManual: '/32_Equipo.pdf', serviceManual: '/32_Equipo_Servicio.pdf' },
  33: { userManual: '/33_Equipo.pdf', serviceManual: '/33_Equipo_Servicio.pdf' },
  34: { userManual: '/34_Equipo.pdf', serviceManual: '/34_Equipo_Servicio.pdf' },
  35: { userManual: '/35_Equipo.pdf', serviceManual: '/35_Equipo_Servicio.pdf' },
  36: { userManual: '/36_Equipo.pdf', serviceManual: '' },
  37: { userManual: '/37_Equipo.pdf', serviceManual: '' },
  39: { userManual: '/39_Equipo.pdf', serviceManual: '' },
  40: { userManual: '/40_Equipo.pdf', serviceManual: '' },
  41: { userManual: '/41_Equipo.pdf', serviceManual: '/41_Equipo_Servicio.pdf' },
  42: { userManual: '/42_Equipo.pdf', serviceManual: '/42_Equipo_Servicio.pdf' },
  43: { userManual: '/43_Equipo.pdf', serviceManual: '' },
  44: { userManual: '/44_Equipo.pdf', serviceManual: '' },
  45: { userManual: '', serviceManual: '/45_Equipo_Servicio.pdf' },
  46: { userManual: '/46_Equipo.pdf', serviceManual: '' },
  47: { userManual: '', serviceManual: '/47_Equipo_Servicio.pdf' },
  48: { userManual: '/48_Equipo.pdf', serviceManual: '' },
  49: { userManual: '/49_Equipo.pdf', serviceManual: '' },
  51: { userManual: '/51_Equipo.pdf', serviceManual: '/51_Equipo_Servicio.pdf' },
  52: { userManual: '/52_Equipo.pdf', serviceManual: '' },
  53: { userManual: '/53_Equipo.pdf', serviceManual: '' },
  54: { userManual: '/54_Equipo.pdf', serviceManual: '/54_Equipo_Servicio.pdf' },
  55: { userManual: '/55_Equipo.pdf', serviceManual: '' },
  57: { userManual: '/57_Equipo.pdf', serviceManual: '' },
  58: { userManual: '/58_Equipo.pdf', serviceManual: '/58_Equipo_Servicio.pdf' },
  59: { userManual: '/59_Equipo.pdf', serviceManual: '' },
  61: { userManual: '/61_Equipo.pdf', serviceManual: '' },
  62: { userManual: '/62_Equipo.pdf', serviceManual: '' },
  65: { userManual: '/65_Equipo.pdf', serviceManual: '' },
  66: { userManual: '/66_Equipo.pdf', serviceManual: '/66_Equipo_Servicio.pdf' },
  67: { userManual: '/67_Equipo.pdf', serviceManual: '/67_Equipo_Servicio.pdf' },
  68: { userManual: '/68_Equipo.pdf', serviceManual: '/68_Equipo_Servicio.pdf' },
  69: { userManual: '/69_Equipo.pdf', serviceManual: '' },
  70: { userManual: '/70_Equipo.pdf', serviceManual: '' },
  71: { userManual: '/71_Equipo.pdf', serviceManual: '' },
  72: { userManual: '/72_Equipo.pdf', serviceManual: '' },
  74: { userManual: '/74_Equipo.pdf', serviceManual: '' },
  75: { userManual: '/75_Equipo.pdf', serviceManual: '' },
  77: { userManual: '/77_Equipo.pdf', serviceManual: '' },
  78: { userManual: '/78_Equipo.pdf', serviceManual: '' },
  79: { userManual: '/79_Equipo.pdf', serviceManual: '' },
  80: { userManual: '/80_Equipo.pdf', serviceManual: '' },
  81: { userManual: '/81_Equipo.pdf', serviceManual: '' },
  82: { userManual: '/82_Equipo.pdf', serviceManual: '' },
  84: { userManual: '/84_Equipo.pdf', serviceManual: '/84_Equipo_Servicio.pdf' },
  85: { userManual: '/85_Equipo.pdf', serviceManual: '' },
  87: { userManual: '/87_Equipo.pdf', serviceManual: '' },
  93: { userManual: '/93_Equipo.pdf', serviceManual: '/93_Equipo_Servicio.pdf' },
  94: { userManual: '/94_Equipo.pdf', serviceManual: '/94_Equipo_Servicio.pdf' },
  96: { userManual: '/96_Equipo.pdf', serviceManual: '' },
  97: { userManual: '/97_Equipo.pdf', serviceManual: '' },
  98: { userManual: '/98_Equipo.pdf', serviceManual: '' },
  99: { userManual: '/99_Equipo.pdf', serviceManual: '' },
  100: { userManual: '/100_Equipo.pdf', serviceManual: '' },
  101: { userManual: '/101_Equipo.pdf', serviceManual: '' },
  103: { userManual: '/103_Equipo.pdf', serviceManual: '' },
  104: { userManual: '/104_Equipo.pdf', serviceManual: '' },
  105: { userManual: '/105_Equipo.pdf', serviceManual: '' },
  106: { userManual: '/106_Equipo.pdf', serviceManual: '' },
  108: { userManual: '/108_Equipo.pdf', serviceManual: '' },
  109: { userManual: '/109_Equipo.pdf', serviceManual: '' },
  110: { userManual: '/110_Equipo.pdf', serviceManual: '/110_Equipo_Servicio.pdf' },
  111: { userManual: '/111_Equipo.pdf', serviceManual: '' },
  112: { userManual: '/112_Equipo.pdf', serviceManual: '' },
  113: { userManual: '/113_Equipo.pdf', serviceManual: '/113_Equipo_Servicio.pdf' },
  114: { userManual: '/114_Equipo.pdf', serviceManual: '' },
  115: { userManual: '/115_Equipo.pdf', serviceManual: '/115_Equipo_Servicio.pdf' },
  116: { userManual: '/116_Equipo.pdf', serviceManual: '/116_Equipo_Servicio.pdf' },
  117: { userManual: '/117_Equipo.pdf', serviceManual: '' },
  118: { userManual: '/118_Equipo.pdf', serviceManual: '' },
  119: { userManual: '/119_Equipo.pdf', serviceManual: '/119_Equipo_Servicio.pdf' },
  120: { userManual: '/120_Equipo.pdf', serviceManual: '' },
  122: { userManual: '/122_Equipo.pdf', serviceManual: '' },
  123: { userManual: '/123_Equipo.pdf', serviceManual: '' },
  124: { userManual: '/124_Equipo.pdf', serviceManual: '' },
  125: { userManual: '/125_Equipo.pdf', serviceManual: '' },
  126: { userManual: '/126_Equipo.pdf', serviceManual: '' },
  127: { userManual: '/127_Equipo.pdf', serviceManual: '' }
  // Agrega aquí los mapeos para los equipos que sí tienen manuales
};

// Crea la lista final de equipos con los manuales asignados según el mapeo
const fullEquipmentList: Equipment[] = equipmentList.map((eq, idx) => {
  const equipmentNumber = idx + 1;
  const manuals = manualMapping[equipmentNumber] || {};
  
  return {
    ...eq,
    userManual: manuals.userManual,
    serviceManual: manuals.serviceManual,
    hasUserManual: Boolean(manuals.userManual),
    hasServiceManual: Boolean(manuals.serviceManual)
  };
});

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  // Obtener lista única de marcas
  const uniqueBrands = Array.from(new Set(equipmentList.map(eq => eq.brand))).sort();

  // Filtrar equipos basado en búsqueda y marca seleccionada
  const filteredEquipment = fullEquipmentList.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === '' || equipment.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="App">
      <AppBar position="static" sx={{ backgroundColor: '#004B8D' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Departamento de Ingeniería Biomédica, TecSalud
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <TextField
            fullWidth
            label="Buscar equipo"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Filtrar por marca</InputLabel>
            <Select
              value={selectedBrand}
              label="Filtrar por marca"
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <MenuItem value="">Todas las marcas</MenuItem>
              {uniqueBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>{brand}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="equipment table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#004B8D' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Marca</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Modelo</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Manual de Usuario</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Manual de Servicio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipment.map((equipment, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{equipment.name}</TableCell>
                  <TableCell>{equipment.brand}</TableCell>
                  <TableCell>{equipment.model}</TableCell>
                  <TableCell>
                    {equipment.hasUserManual 
                      ? (
                          <a
                            href={equipment.userManual}
                            download
                            style={{
                              textDecoration: 'none'
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '6px 16px',
                                cursor: 'pointer'
                              }}
                            >
                              Descargar
                            </button>
                          </a>
                        )
                      : 'No disponible'}
                  </TableCell>
                  <TableCell>
                    {equipment.hasServiceManual 
                      ? (
                          <a
                            href={equipment.serviceManual}
                            download
                            style={{
                              textDecoration: 'none'
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '6px 16px',
                                cursor: 'pointer'
                              }}
                            >
                              Descargar
                            </button>
                          </a>
                        )
                      : 'No disponible'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;