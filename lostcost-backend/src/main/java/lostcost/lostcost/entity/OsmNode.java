package lostcost.lostcost.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "planet_osm_nodes")
public class OsmNode {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "lat")
    private Double latitude;

    @Column(name = "lon")
    private Double longitude;

    @OneToOne(mappedBy = "osmNode")
    private OsmPoint osmPoint;
}