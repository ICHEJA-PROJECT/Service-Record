import { Injectable } from "@nestjs/common";

@Injectable()
export class CalculateSkillPercentagesUseCase {
  run(scores: any[], percentages: any[]): any[] {
    
    // Crear mapa usando la propiedad correcta: skillid (minúscula)
    const percentageMap = new Map<number, number>();
    percentages.forEach(p => percentageMap.set(p.skillid, p.percentage));
    
    return scores
      .map(scoreItem => {
        // Buscar usando skillId del scoreItem
        const percentage = percentageMap.get(scoreItem.skillId);
        
        if (percentage !== undefined) {
          return {
            skillId: scoreItem.skillId, // Corregido: usar skillId, no skillid
            score: scoreItem.score * percentage
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  }
}