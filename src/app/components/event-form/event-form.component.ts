import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  eventId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      location: ['', Validators.required],
      imageUrl: [''],
      registrationLink: [''],
      maxParticipants: [''],
      organizer: [''],
      contactEmail: [''],
      contactPhone: [''],
      featured: [false],
      active: [true],
      eventType: [''],
      speakers: [[]],
      agenda: [[]]
    });

    // Check if we're editing
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.eventId = +id;
        this.loadEvent(this.eventId);
      }
    });
  }

  loadEvent(id: number) {
    this.eventService.getEventById(id).subscribe(event => {
      this.eventForm.patchValue(event);
    });
  }

  onSubmit() {
    if (this.eventForm.invalid) return;

    const eventData: Event = this.eventForm.value;

    if (this.isEditMode && this.eventId) {
      this.eventService.updateEvent(this.eventId, eventData).subscribe(() => {
        alert('Event updated!');
        this.router.navigate(['/']);
      });
    } else {
      this.eventService.createEvent(eventData).subscribe(() => {
        alert('Event created!');
        this.router.navigate(['/']);
      });
    }
  }
}
