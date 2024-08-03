import song1 from '/songs/Osher_Cohen&Noa Kirel_Ain_Oti.mp3';
import song2 from '/songs/Peer Tasi - Haizarit.mp3';
import song3 from '/songs/איתי לוי - מערב ראשון (Prod. By Maor Shitrit).mp3';
import song4 from '/songs/אושר כהן - עד שיירד הסהר.mp3'
import song5 from '/songs/Benson Boone - In The Stars (Official Music Video).mp3'
import song6 from '/songs/Nico & Vinz - Am I Wrong (LyricsVietsub).mp3'
import song7 from '/songs/Shawn Mendes - Mercy (Lyrics).mp3'
import song8 from '/songs/Foster The People - Pumped Up Kicks (Official Audio).mp3'
import song9 from '/songs/Wing$.mp3'

export interface Track {
  title: string;
  src: string;
}

export const tracks: Track[] = [
  {
    title: 'Osher Cohen and Noa Kirel - Ain Oti',   
    src: song1,
  },
  {
    title: 'Peer Tasi - Haizarit',
    src: song2,
  },
  {
    title: 'איתי לוי - מערב ראשון (Prod. By Maor Shitrit)',
    src: song3,
  },
  {
    title: 'אושר כהן - עד שיירד הסהר',
    src: song4,
  },
  {
    title: 'Benson Boone - In The Stars',
    src: song5,
  },
  {
    title: 'Nico & Vinz - Am I Wrong',
    src: song6,
  },
  {
    title: 'Shawn Mendes - Mercy',
    src: song7,
  },
  {
    title: 'Foster The People - Pumped Up Kicks',
    src: song8,
  },
  {
    title: 'Macklemore - Wing$',
    src: song9,
  },
];

export default tracks;
