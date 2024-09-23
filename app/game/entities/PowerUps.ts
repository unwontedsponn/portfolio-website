// PowerUps.ts
import { Player } from "@/app/game/entities/Player";
import { switchMusic } from '@/app/game/utils/Audio';

export type PowerUp = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

export const createPowerUp = (canvasWidth: number, canvasHeight: number): PowerUp => ({
  x: canvasWidth,
  y: canvasHeight - 85,
  width: 20,
  height: 20,
  color: '#5f9251', // green
});

export const updatePowerUps = (
  powerUps: PowerUp[],
  player: Player,
  canvasWidth: number,
  canvasHeight: number,
  setIsPowerUpActive: (isActive: boolean) => void,
  audioRef: React.RefObject<HTMLAudioElement>,  
  setAudioType: (type: 'normal' | '8bit') => void,  
) => {
  
  powerUps.forEach((powerUp, index) => {    
    powerUp.x -= 6;  
    if (powerUp.x + powerUp.width < 0) powerUps.splice(index, 1); 
    
    if (
      player.x < powerUp.x + powerUp.width &&
      player.x + player.width > powerUp.x &&
      player.y < powerUp.y + powerUp.height &&
      player.y + player.height > powerUp.y
    ) {             
      setIsPowerUpActive(true);  
      powerUps.splice(index, 1);
      
      const currentTime = audioRef?.current?.currentTime || 0;
      switchMusic(audioRef, currentTime, '8bit', setAudioType);
      
      setTimeout(() => {
        const newCurrentTime = audioRef?.current?.currentTime || 0;
        switchMusic(audioRef, newCurrentTime, 'normal', setAudioType);
        setIsPowerUpActive(false);
      }, 5000);
    }
  });
  const spawnProbability = 0.001;
  if (Math.random() < spawnProbability) powerUps.push(createPowerUp(canvasWidth, canvasHeight));
};