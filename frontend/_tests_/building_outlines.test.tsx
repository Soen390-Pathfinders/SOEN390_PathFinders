// _tests_/outlines.test.js

import outlines from '@/app/components/maps/building_outlines';

describe('Building Outlines', () => {
    it('should contain the correct number of building outlines', () => {
      expect(outlines.length).toBe(49); // Adjust the number based on the actual count
    });
  
    it('should have the correct structure for each building outline', () => {
      outlines.forEach(building => {
        expect(building).toHaveProperty('id');
        expect(building).toHaveProperty('campus');
        expect(building).toHaveProperty('buildingName');
        expect(building).toHaveProperty('coordinates');
        expect(Array.isArray(building.coordinates)).toBe(true);
  
        building.coordinates.forEach(coord => {
          expect(coord).toHaveProperty('latitude');
          expect(coord).toHaveProperty('longitude');
        });
      });
    });
  
    it('should have the correct data for a specific building', () => {
      const specificBuilding = outlines.find(building => building.id === 1);
      expect(specificBuilding).toBeDefined();
  
      if (specificBuilding) {
        expect(specificBuilding.campus).toBe('SGW');
        expect(specificBuilding.buildingName).toBe('B Annex');
        expect(specificBuilding.coordinates.length).toBeGreaterThan(0);
      }
    });
  });