package lostcost.lostcost.service;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.entity.OsmPoint;
import lostcost.lostcost.repository.OsmPointRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class OsmPointService {

    private final OsmPointRepository osmPointRepository;

    public OsmPointService(OsmPointRepository osmPointRepository) {
        this.osmPointRepository = osmPointRepository;
    }

    @Async("taskExecutor")
    public CompletableFuture<List<OsmEntityDTO>> searchOsmPointsByName(String name) {
        List<OsmPoint> osmPoints = osmPointRepository.findByNameContainingIgnoreCase(name);
        List<OsmEntityDTO> osmPointDTOs = new ArrayList<>();

        for (OsmPoint osmPoint : osmPoints) {
            OsmEntityDTO osmPointDTO = new OsmEntityDTO();
            osmPointDTO.setName(osmPoint.getName());
            if (osmPoint.getOsmNode() != null) {
                osmPointDTO.setLongitude(osmPoint.getOsmNode().getLon());
                osmPointDTO.setLatitude(osmPoint.getOsmNode().getLat());
            }
            osmPointDTOs.add(osmPointDTO);
        }

        return CompletableFuture.completedFuture(osmPointDTOs);
    }
}
