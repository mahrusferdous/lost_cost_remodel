package lostcost.lostcost.service;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.entity.OsmLine;
import lostcost.lostcost.entity.OsmPoint;
import lostcost.lostcost.entity.OsmPolygon;
import lostcost.lostcost.entity.OsmRoad;
import lostcost.lostcost.repository.OsmLineRepository;
import lostcost.lostcost.repository.OsmPointRepository;
import lostcost.lostcost.repository.OsmPolygonRepository;
import lostcost.lostcost.repository.OsmRoadRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Service
public class OsmEntityService {

    private final OsmRoadRepository osmRoadRepository;
    private final OsmPointRepository osmPointRepository;
    private final OsmLineRepository osmLineRepository;
    private final OsmPolygonRepository osmPolygonRepository;

    public OsmEntityService(OsmRoadRepository osmRoadRepository,
                            OsmPointRepository osmPointRepository,
                            OsmLineRepository osmLineRepository,
                            OsmPolygonRepository osmPolygonRepository) {
        this.osmRoadRepository = osmRoadRepository;
        this.osmPointRepository = osmPointRepository;
        this.osmLineRepository = osmLineRepository;
        this.osmPolygonRepository = osmPolygonRepository;
    }

    @Async("taskExecutor")
    public CompletableFuture<Set<OsmEntityDTO>> searchOsmEntitiesByName(String name) {
        Set<OsmEntityDTO> osmEntityDTOs = new HashSet<>();

        List<OsmPoint> osmPoints = osmPointRepository.findByNameContainingIgnoreCase(name);
        for (OsmPoint osmPoint : osmPoints) {
            OsmEntityDTO osmEntityDTO = new OsmEntityDTO();
            if (osmPoint.getOsmNode() != null) {
                osmEntityDTO.setName(osmPoint.getName());
                osmEntityDTO.setId(osmPoint.getOsmId());
                osmEntityDTO.setLongitude(osmPoint.getOsmNode().getLon());
                osmEntityDTO.setLatitude(osmPoint.getOsmNode().getLat());
            }
            osmEntityDTOs.add(osmEntityDTO);
        }

        List<OsmLine> osmLines = osmLineRepository.findByNameContainingIgnoreCase(name);
        for (OsmLine osmLine : osmLines) {
            OsmEntityDTO osmEntityDTO = new OsmEntityDTO();
            if (osmLine.getOsmNode() != null) {
                osmEntityDTO.setName(osmLine.getName());
                osmEntityDTO.setId(osmLine.getOsmId());
                osmEntityDTO.setLongitude(osmLine.getOsmNode().getLon());
                osmEntityDTO.setLatitude(osmLine.getOsmNode().getLat());
            }
            osmEntityDTOs.add(osmEntityDTO);
        }

        List<OsmPolygon> osmPolygons = osmPolygonRepository.findByNameContainingIgnoreCase(name);
        for (OsmPolygon osmPolygon : osmPolygons) {
            OsmEntityDTO osmEntityDTO = new OsmEntityDTO();

            if (osmPolygon.getOsmNode() != null) {
                osmEntityDTO.setName(osmPolygon.getName());
                osmEntityDTO.setId(osmPolygon.getOsmId());
                osmEntityDTO.setLongitude(osmPolygon.getOsmNode().getLon());
                osmEntityDTO.setLatitude(osmPolygon.getOsmNode().getLat());
                osmEntityDTOs.add(osmEntityDTO);
            }
        }

        List<OsmRoad> osmRoads = osmRoadRepository.findByNameContainingIgnoreCase(name);
        for (OsmRoad osmRoad : osmRoads) {
            OsmEntityDTO osmEntityDTO = new OsmEntityDTO();
            if (osmRoad.getOsmNode() != null) {
                osmEntityDTO.setName(osmRoad.getName());
                osmEntityDTO.setId(osmRoad.getOsmId());
                osmEntityDTO.setLongitude(osmRoad.getOsmNode().getLon());
                osmEntityDTO.setLatitude(osmRoad.getOsmNode().getLat());
            }
            osmEntityDTOs.add(osmEntityDTO);
        }

        return CompletableFuture.completedFuture(osmEntityDTOs);
    }
}

