package lostcost.lostcost.repository;

import lostcost.lostcost.entity.OsmNode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OsmNodeRepository extends JpaRepository<OsmNode, Long> {
    // Add custom query methods if needed
}
