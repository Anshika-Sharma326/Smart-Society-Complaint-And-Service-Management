package com.smartsociety.smart_society_portal.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import com.smartsociety.smart_society_portal.entity.Staff;
@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @Column(length = 2000)
    private String description;

    private String category;

    private String priority;

    private String status;

    private LocalDateTime createdAt;

    // Resident who raised the complaint
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Staff assigned by Admin
    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff assignedStaff;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();

        if (status == null) {
            status = "Pending";
        }
    }
    public Staff getAssignedStaff() {
        return assignedStaff;
    }

    public void setAssignedStaff(Staff assignedStaff) {
        this.assignedStaff = assignedStaff;
    }
}