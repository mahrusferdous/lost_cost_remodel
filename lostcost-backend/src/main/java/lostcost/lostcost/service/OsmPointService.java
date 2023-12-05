package lostcost.lostcost.service;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.entity.OsmPoint;
import lostcost.lostcost.repository.OsmPointRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.TimeUnit;

@Service
public class OsmPointService {

    private final OsmPointRepository osmPointRepository;
    private final Executor executor;

    public OsmPointService(OsmPointRepository osmPointRepository, Executor executor) {
        this.osmPointRepository = osmPointRepository;
        this.executor = executor;
    }

    @Async("taskExecutor")
    public CompletableFuture<List<OsmEntityDTO>> searchOsmPointsByName(String name) {
        return CompletableFuture.supplyAsync(() -> {
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

            return osmPointDTOs;
        }, executor).orTimeout(5, TimeUnit.SECONDS); // Add a timeout of 5 seconds
    }
}